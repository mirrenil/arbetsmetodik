import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import Dave from "../Assets/Images/Dave.png";
import { useAuth } from "../Contexts/AuthContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Clear, Edit } from "@mui/icons-material";

function DetailPage() {
  const listingCollection = collection(db, "listings");
  const { id } = useParams();
  const [item, setItem] = useState<IListItem>();
  const { currentUser } = useAuth();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const [title, setTitle] = useState<string>("");

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
  }, []);

  const handleSendRequest = async (e?: Event) => {
    const newRequest = {
      accepted: false,
      createdAt: new Date(),
      fromUser: currentUser?.uid,
      itemId: item?.id,
      priceTotal: item?.price,
      toUser: item?.authorID,
    };
    const docRef = await addDoc(collection(db, "requests"), newRequest);
  };

  const deleteListing = async (id: string) => {
    const itemToRemove = doc(db, "listings", id);
    await deleteDoc(itemToRemove);
    alert("Listing with id " + id + " has been deleted");
  };

  const updateListing = async (id: string) => {
    const itemToUpdate = doc(db, "listings", id);
    try {
      await updateDoc(itemToUpdate, {
        title: title,
      });
      console.log("Listing with id " + id + " has been updated");
      return itemToUpdate;
    } catch (e) {
      console.log("Error updating document: ", e);
    }
  };

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
                    <form onSubmit={() => updateListing(id as string)}>
                      <DialogContent sx={crudModal}>
                        <DialogContentText>
                          Update your listing
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="normal"
                          type="text"
                          label="Title"
                          variant="standard"
                          value={title || ""}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ marginTop: "1.5rem" }}
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
              <Typography sx={location} variant="body2" color="text.primary">
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
  position: { xs: "static", md: "relative", lg: "relative", xl: "relative" },
  top: { xs: "0", md: "150px", lg: "150px", xl: "150px" },
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
};

const imageContainer: SxProps = {
  display: "flex",
  alignItems: "center",
  maxHeight: "600px",
  maxWidth: "600px",
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

const location: SxProps = {
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
  height: 500,
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
