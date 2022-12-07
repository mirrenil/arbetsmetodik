/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { IListItem } from "../Interfaces";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  SxProps,
  DialogContent,
  DialogContentText,
  Modal,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import Dave from "../Assets/Images/Dave.png";
import { useAuth } from "../Contexts/AuthContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Clear, Edit } from "@mui/icons-material";

const categories = [
  {
    value: "Electronics",
    title: "Electronics",
  },
  {
    value: "Film & Photography",
    title: "Film & Photography",
  },
  {
    value: "Home",
    title: "Home",
  },
  {
    value: "Clothing",
    title: "Clothing",
  },
  {
    value: "Tools",
    title: "Tools",
  },
  {
    value: "Gaming",
    title: "Gaming",
  },
  {
    value: "Cars",
    title: "Cars",
  },
  {
    value: "Other",
    title: "Other",
  },
];

function DetailPage() {
  const listingCollection = collection(db, "listings");
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [item, setItem] = useState<IListItem>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleSendRequest = async (e?: Event) => {
    const newRequest = {
      accepted: false,
      createdAt: new Date(),
      fromUserId: currentUser?.uid,
      fromUserName: currentUser?.displayName,
      itemId: item?.id,
      priceTotal: item?.price,
      toUser: item?.authorID,
    };
    const docRef = await addDoc(collection(db, "requests"), newRequest);
  };

  const deleteListing = async (id: string) => {
    const itemToRemove = doc(db, "listings", id);
    await deleteDoc(itemToRemove);
    navigate("/profile/:id");
  };

  const updateListing = useCallback(async () => {
    if (id) {
      const itemToUpdate = doc(db, "listings", id);
      await updateDoc(itemToUpdate, {
        title: title,
        description: description,
        price: price,
        location: location,
        image: image,
        category: category,
      });
      handleClose();
    } else {
      return (
        <Box>
          <Typography variant="h4">Error</Typography>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Take me back
          </Button>
        </Box>
      );
    }
  }, [id, title, description, price, location, image, category]);

  useEffect(() => {
    async function setDocumentData() {
      const documents: any = await getDocs(listingCollection);
      const listingsProvided: any = [];
      documents.forEach((doc: any) => {
        let listing = doc.data();
        listing = { ...listing, id: doc.id };
        listingsProvided.push(listing);
      });
      const listingProvided = listingsProvided.find(
        (item: any) => item.id === id
      );
      return setItem(listingProvided);
    }
    setDocumentData();
  }, [updateListing, modalOpen]);

  return (
    <Box sx={wrapper}>
      <Card sx={itemContainer}>
        <Box sx={imageContainer}>
          <CardMedia
            component="img"
            image={item?.image}
            alt={item?.image}
            sx={itemImage}
          />
        </Box>
        <CardContent sx={infoContainer}>
          <Box sx={cardHeaders}>
            {currentUser?.uid === item?.authorID && (
              <>
                <Box sx={crudItems}>
                  <button
                    style={{
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => deleteListing(id as string)}
                  >
                    <Clear />
                  </button>
                  <button
                    style={{
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      padding: "1rem",
                    }}
                    onClick={handleOpen}
                  >
                    <Edit />
                  </button>
                </Box>
                <Modal open={modalOpen} onClose={handleClose}>
                  <Box sx={modalStyle}>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        updateListing();
                      }}
                    >
                      <DialogContent sx={crudModal}>
                        <DialogContentText>
                          Update your listing
                        </DialogContentText>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                          name="categories"
                          value={category}
                          label="Category"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {categories.map((chooseCategory, index) => (
                            <MenuItem key={index} value={chooseCategory.title}>
                              {chooseCategory.title}
                            </MenuItem>
                          ))}
                        </Select>
                        <TextField
                          autoFocus
                          margin="normal"
                          type="text"
                          label="Title"
                          variant="standard"
                          value={title || ""}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                          autoFocus
                          margin="normal"
                          type="text"
                          label="Description"
                          variant="standard"
                          value={description || ""}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                          autoFocus
                          margin="normal"
                          type="number"
                          label="Price"
                          variant="standard"
                          value={price || ""}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                          autoFocus
                          margin="normal"
                          type="text"
                          label="Location"
                          variant="standard"
                          value={location || ""}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        <TextField
                          autoFocus
                          margin="normal"
                          type="text"
                          label="Image"
                          variant="standard"
                          value={image || ""}
                          onChange={(e) => setImage(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          onClick={() => {
                            updateListing();
                          }}
                          sx={{ marginTop: "1.5rem", color: "white" }}
                        >
                          Update Listing
                        </Button>
                      </DialogContent>
                    </form>
                  </Box>
                </Modal>
              </>
            )}
            <Typography
              sx={titlePrice}
              gutterBottom
              variant="h5"
              component="div"
            >
              {item?.title}
            </Typography>
            <Typography
              sx={titlePrice}
              gutterBottom
              variant="h5"
              component="div"
            >
              {item?.price}:- per day
            </Typography>
          </Box>
          <Box sx={descLocation}>
            <Typography variant="body2" color="text.primary">
              {item?.description}
            </Typography>
            <Box>
              <Typography
                sx={listingLocation}
                variant="body2"
                color="text.primary"
              >
                {item?.location}
                <LocationOnIcon sx={{ fontSize: "1rem" }} />
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <Card sx={lessorCard}>
          <Box sx={lessorCardLeftInfo}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                David Jensen
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Member since: 1231 23 123
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                View profile
              </Typography>
            </CardContent>
          </Box>
          <CardMedia component="img" sx={lessorPic} image={Dave} alt="Dave" />
        </Card>
        <Button
          sx={button}
          variant="contained"
          onClick={() => handleSendRequest()}
        >
          Send a request
        </Button>
      </Card>
    </Box>
  );
}

const wrapper: SxProps = {
  position: "relative",
  top: { xs: "60px", md: "170px", lg: "150px", xl: "150px" },
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
};

const itemContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: { xs: "80%", md: "50%", lg: "50%", xl: "50%" },
  height: "50%",
  boxShadow: "none",
  zIndex: -1,
};

const imageContainer: SxProps = {
  display: "flex",
  alignItems: "center",
  maxHeight: { xs: "400px", md: "500px", lg: "600px", xl: "600px" },
  maxWidth: { xs: "400px", md: "500px", lg: "600px", xl: "600px" },
};

const infoContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "95%",
};
const cardHeaders: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};
const titlePrice: CSSProperties = {
  color: "rgba(51, 51, 51, 0.7)",
};

const descLocation: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

const listingLocation: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontStyle: "italic",
};

const itemImage: CSSProperties = {
  objectFit: "fill",
};

const lessorCard: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "98%",
  height: "191",
  boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.29)",
};

const lessorCardLeftInfo: SxProps = {
  display: "flex",
  flexDirection: "column",
};

const lessorPic: SxProps = {
  width: { xs: "25%", md: "12%", lg: "12%", xl: "12%" },
  marginRight: { xs: "0", md: "1rem", lg: "1rem", xl: "1rem" },
};

const button: SxProps = {
  marginTop: "1rem",
  marginBottom: "2rem",
  width: "40%",
  height: "15%",
  color: "white",
};

const crudItems = {
  display: "flex",
  flexDirection: "row",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

const crudModal = {
  display: "flex",
  flexDirection: "column",
};

export default DetailPage;
