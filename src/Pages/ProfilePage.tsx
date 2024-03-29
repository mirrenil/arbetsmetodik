/* eslint-disable */
import {
    Box,
    TextField,
    Typography,
    DialogContent,
    DialogContentText,
    Modal,
    Button,
    SxProps,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../Contexts/AuthContext";
import { useItems } from "../Contexts/ItemContext";
import ItemCard from "../Components/ItemCard";
import { IListItem, IUser } from "../Interfaces";
import { updateProfile, User } from "firebase/auth";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function ProfilePage() {
    const { fetchItemsFromDb, items } = useItems();
    const { currentUser } = useAuth();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const [username, setUsername] = useState(currentUser?.displayName);
    const userImg: any = currentUser?.photoURL;
    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate();
    const { id } = useParams();

    const currentUserItems = items.filter((item) => item.authorID === user?.id);

    const setDocumentData = async () => {
        const userDocRef = doc(db, "users", `${id}`);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const user: any = docSnap.data();
            user.id = docSnap.id;
            await setUser(user);
        }
    };

    const handleNameChange = async (e: FormEvent) => {
        e.preventDefault();
        let userObject = {
            displayName: username,
        };
        userObject = { ...userObject };
        await updateProfile(currentUser as User, userObject);
        await setDoc(doc(db, "users", currentUser!.uid), {
            displayName: username,
            email: currentUser?.email,
        });
        setDocumentData();
        handleClose();
    };

    useEffect(() => {
        setDocumentData();
        fetchItemsFromDb();
        AOS.init();
        AOS.refresh();
    }, [id]);

    return (
        <Box sx={wrapper}>
            {currentUser ? (
                <>
                    {userImg ? (
                        <img
                            style={{
                                width: "250px",
                                height: "250px",
                                borderRadius: "50%",
                                marginTop: "3rem",
                            }}
                            src={userImg}
                            alt="profile picture"
                        />
                    ) : (
                        <img
                            style={{
                                width: "250px",
                                height: "250px",
                                borderRadius: "50%",
                            }}
                            src="https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg"
                            alt="profile picture"
                        />
                    )}
                    <>
                        <Typography variant="h2" component="h2">
                            {user?.displayName}
                        </Typography>
                        {currentUser?.uid === id ? (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <button
                                    onClick={handleOpen}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        border: "none",
                                        backgroundColor: "transparent",
                                        cursor: "pointer",
                                        padding: "0",
                                    }}
                                >
                                    <Typography sx={{ fontSize: ".7rem" }}>
                                        Change your display name
                                    </Typography>
                                    <SettingsIcon sx={{ fontSize: "small" }} />
                                </button>
                            </Box>
                        ) : null}
                    </>

                    <Modal open={modalOpen} onClose={handleClose}>
                        <Box sx={modalStyle}>
                            <form onSubmit={handleNameChange}>
                                <DialogContent>
                                    <DialogContentText>
                                        Update your username:
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="normal"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={username || ""}
                                        required
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={{ color: "white" }}
                                    >
                                        Update
                                    </Button>
                                </DialogContent>
                            </form>
                        </Box>
                    </Modal>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{ marginTop: "2rem", marginBottom: "2rem" }}
                    >
                        Listings
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            width: {
                                xs: "100%",
                                md: "100%",
                                lg: "80%",
                                xl: "80%",
                            },
                        }}
                    >
                        {currentUserItems.map((item: IListItem) => (
                            <Link
                                to={`/items/${item.id}`}
                                key={item.id}
                                style={{ textDecoration: "none" }}
                            >
                                <ItemCard key={item.id} item={item} />
                            </Link>
                        ))}
                    </Box>
                </>
            ) : (
                <Box sx={notSignedIn}>
                    <Typography variant="h5">
                        Looks like you are not signed in!
                    </Typography>
                    <Box sx={buttonBox}>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={signButton}
                            onClick={() => navigate("/signin")}
                        >
                            Sign in
                        </Button>
                        <Typography variant="subtitle2">
                            Dont have an account yet?
                        </Typography>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={signButton}
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

const wrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: { xs: "80vh", md: "70vh", lg: "70vh", xl: "70vh" },
    marginTop: { xs: "3rem", md: "4rem", lg: "0", xl: "0" },
    zIndex: "100",
};

const notSignedIn: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "300px",
};

const buttonBox: SxProps = {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "3rem",
    height: "50%",
};

const signButton: SxProps = {
    width: "200px",
    color: "white",
    background: "#00C4BA",
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

export default ProfilePage;
