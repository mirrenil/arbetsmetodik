/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { IListItem, IRequest, ReqStatus, IUser } from "../Interfaces";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    DialogContent,
    DialogContentText,
    Modal,
    TextField,
    InputLabel,
    MenuItem,
    Select,
    SxProps,
} from "@mui/material";
import { useAuth } from "../Contexts/AuthContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import * as yup from "yup";
import { useFormik } from "formik";
import { useUser } from "../Contexts/UserContext";

const validationSchema = yup.object({
    category: yup.string().required("Category is required"),
    title: yup.string().required("Please choose a title"),
    price: yup.number().required("Please set a price in numbers"),
    description: yup.string().required("Please provide a description"),
    location: yup
        .string()
        .required("Please provide a district in Gothenburg (ex. Hisingen)"),
    image: yup
        .string()
        .min(8, "The Image URL should be of minimum 8 characters length")
        .required("Example: https://minhast.se/uploads/GettyImages.jpg"),
});

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
    const [user, setUser] = useState<IUser>();
    const [reqSent, setReqSent] = useState<boolean>(false);
    const { mySentRequests, getMySentRequests, myReceivedRequests } = useUser();
    const [cookies] = useCookies(["user"]);

    const formik = useFormik({
        initialValues: {
            category: "",
            title: "",
            price: "",
            description: "",
            location: "",
            image: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateListing();
        },
    });

    useEffect(() => {
        ifUserHasRequestOnItem();
        getItem();
    }, [mySentRequests, currentUser]);

    const ifUserHasRequestOnItem = () => {
        for (let req of mySentRequests) {
            if (id === req.itemId) {
                return setReqSent(true);
            }
        }
        return setReqSent(false);
    };

    const handleSendRequest = async (e?: Event) => {
        const newRequest: IRequest = {
            accepted: ReqStatus.pending,
            createdAt: new Date(),
            fromUserId: cookies.user?.uid,
            fromUserName: cookies.user?.displayName,
            itemId: item!.id,
            priceTotal: item!.price,
            toUser: item!.authorID,
        };
        try {
            await addDoc(collection(db, "requests"), newRequest);
            setReqSent(true);
            getMySentRequests();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteListing = async (id: string) => {
        const itemToRemove = doc(db, "listings", id);
        try {
            await deleteDoc(itemToRemove);
            navigate(`/profile/${cookies.user.uid}`);
        } catch (err) {
            console.log(err);
        }
    };

    const updateListing = useCallback(async () => {
        if (id) {
            const itemToUpdate = doc(db, "listings", id);
            await updateDoc(itemToUpdate, {
                title: formik.values.title,
                description: formik.values.description,
                price: formik.values.price,
                location: formik.values.location,
                image: formik.values.image,
                category: formik.values.category,
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
    }, [id, formik.values]);

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
            const userDocRef = doc(db, "users", listingProvided.authorID);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const user: any = docSnap.data();
                setUser(user);
            }
            return setItem(listingProvided);
        }
        setDocumentData();
    }, [updateListing, modalOpen]);

    const getItem = async () => {
        if (id) {
            const docRef: any = doc(db, "listings", id);
            const docSnap: any = await getDoc(docRef);
            const item = docSnap.data();
            if (item) {
                setItem({
                    authorID: item.authorID,
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    price: item.price,
                    category: item.category,
                    location: item.location,
                    id: id,
                });
            }
        }
    };
    const filteredMyReceivedRequests = myReceivedRequests.filter(
        (item) => item.accepted === 0
    );
    const itemHasRequest = filteredMyReceivedRequests.find(
        (req) => req.itemId === item?.id
    );

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
                {currentUser?.uid === item?.authorID ? (
                    <>
                        <Box sx={crudItems}>
                            <Button
                                sx={button}
                                variant="contained"
                                onClick={() => deleteListing(id as string)}
                            >
                                Remove
                            </Button>

                            <Button
                                sx={button}
                                variant="contained"
                                onClick={handleOpen}
                            >
                                Edit
                            </Button>
                        </Box>
                        <Modal open={modalOpen} onClose={handleClose}>
                            <Box sx={modalStyle}>
                                {itemHasRequest ? (
                                    <>
                                        You can't edit this item, since you have
                                        a pending request
                                    </>
                                ) : (
                                    <form onSubmit={formik.handleSubmit}>
                                        <DialogContent sx={crudModal}>
                                            <DialogContentText
                                                sx={{ fontSize: "2rem" }}
                                            >
                                                Update your listing
                                            </DialogContentText>
                                            <InputLabel id="category">
                                                Category
                                            </InputLabel>
                                            <Select
                                                id="category"
                                                name="category"
                                                value={formik.values.category}
                                                label="Category"
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.category &&
                                                    Boolean(
                                                        formik.errors.category
                                                    )
                                                }
                                            >
                                                {categories.map(
                                                    (chooseCategory, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={
                                                                chooseCategory.title
                                                            }
                                                        >
                                                            {
                                                                chooseCategory.title
                                                            }
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                            <TextField
                                                id="title"
                                                name="title"
                                                autoFocus
                                                margin="normal"
                                                type="text"
                                                label="Title"
                                                value={formik.values.title}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.title &&
                                                    Boolean(formik.errors.title)
                                                }
                                                helperText={
                                                    formik.touched.title &&
                                                    formik.errors.title
                                                }
                                            />
                                            <TextField
                                                id="description"
                                                name="description"
                                                autoFocus
                                                margin="normal"
                                                type="text"
                                                label="Description"
                                                value={
                                                    formik.values.description
                                                }
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched
                                                        .description &&
                                                    Boolean(
                                                        formik.errors
                                                            .description
                                                    )
                                                }
                                                helperText={
                                                    formik.touched
                                                        .description &&
                                                    formik.errors.description
                                                }
                                            />
                                            <TextField
                                                id="price"
                                                name="price"
                                                autoFocus
                                                margin="normal"
                                                type="number"
                                                label="Price"
                                                value={formik.values.price}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.price &&
                                                    Boolean(formik.errors.price)
                                                }
                                                helperText={
                                                    formik.touched.price &&
                                                    formik.errors.price
                                                }
                                            />
                                            <TextField
                                                id="location"
                                                name="location"
                                                autoFocus
                                                margin="normal"
                                                type="text"
                                                label="Location"
                                                value={formik.values.location}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.location &&
                                                    Boolean(
                                                        formik.errors.location
                                                    )
                                                }
                                                helperText={
                                                    formik.touched.location &&
                                                    formik.errors.location
                                                }
                                            />
                                            <TextField
                                                id="image"
                                                name="image"
                                                autoFocus
                                                margin="normal"
                                                type="text"
                                                label="Image"
                                                value={formik.values.image}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.image &&
                                                    Boolean(formik.errors.image)
                                                }
                                                helperText={
                                                    formik.touched.image &&
                                                    formik.errors.image
                                                }
                                            />
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                sx={{
                                                    marginTop: "1.5rem",
                                                    color: "white",
                                                }}
                                            >
                                                Update Listing
                                            </Button>
                                        </DialogContent>
                                    </form>
                                )}
                            </Box>
                        </Modal>
                    </>
                ) : (
                    <Card sx={lessorCard}>
                        <Box sx={lessorCardLeftInfo}>
                            <CardContent sx={{ flex: "1 0 auto" }}>
                                <img
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        borderRadius: "50%",
                                    }}
                                    src="https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg"
                                    alt="profile picture"
                                />
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    component="div"
                                >
                                    {user?.displayName}
                                </Typography>
                                <Link
                                    to={`/profile/${item?.authorID}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    View Profile
                                </Link>
                            </CardContent>
                        </Box>
                    </Card>
                )}

                {reqSent ? (
                    <Typography variant="h4">Request sent!</Typography>
                ) : (
                    <>
                        {currentUser?.uid !== item?.authorID && (
                            <Button
                                sx={button}
                                variant="contained"
                                onClick={() => handleSendRequest()}
                            >
                                Send a request
                            </Button>
                        )}
                        {!currentUser && (
                            <>
                                <Typography align="center" variant="h6">
                                    You are not signed in, please sign in to be
                                    able to send a booking request.
                                </Typography>
                                <Button
                                    sx={button}
                                    variant="contained"
                                    onClick={() => navigate("/signin")}
                                >
                                    Sign in
                                </Button>
                            </>
                        )}
                    </>
                )}
            </Card>
        </Box>
    );
}

const wrapper: SxProps = {
    position: "relative",
    top: { xs: "60px", md: "250px", lg: "150px", xl: "150px" },
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "15rem",
    minHeight: "800px",
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
    maxHeight: { xs: "400px", md: "500px", lg: "600px", xl: "600px" },
    maxWidth: { xs: "400px", md: "500px", lg: "600px", xl: "600px" },
    mb: 10,
};

const infoContainer: SxProps = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "95%",
};

const cardHeaders: SxProps = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
};

const titlePrice: SxProps = {
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

const itemImage: SxProps = {
    objectFit: "fill",
};

const lessorCard: SxProps = {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    height: "191",
    boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.29)",
    mb: 5,
};

const lessorCardLeftInfo: SxProps = {
    display: "flex",
    flexDirection: "column",
};

const button: SxProps = {
    marginTop: "1rem",
    marginBottom: "2rem",
    width: "40%",
    height: "15%",
    color: "white",
};

const crudItems: SxProps = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "70%",
};

const modalStyle: SxProps = {
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

const crudModal: SxProps = {
    display: "flex",
    flexDirection: "column",
};

export default DetailPage;
