import {
  Box,
  TextField,
  Typography,
  DialogContent,
  DialogContentText,
  Modal,
  Button,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../Contexts/AuthContext";
import { useItems } from "../Contexts/ItemContext";
import ItemCard from "../Components/ItemCard";
import { IListItem } from "../Interfaces";
import { updateProfile, User } from "firebase/auth";
import SettingsIcon from "@mui/icons-material/Settings";

function ProfilePage() {
  const { fetchItemsFromDb, items } = useItems();
  const { currentUser } = useAuth();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const [description, setDescription] = useState<string>("");
  const [username, setUsername] = useState(currentUser?.displayName);
  const userImg: any = currentUser?.photoURL;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let userObject = {
      displayName: username,
    };
    userObject = { ...userObject };
    await updateProfile(currentUser as User, userObject);
    handleClose();
  };

  useEffect(() => {
    fetchItemsFromDb();
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        margin: "2rem",
      }}
    >
      {currentUser ? (
        <>
          {userImg ? (
            <img
              style={{ width: "250px", height: "250px", borderRadius: "50%" }}
              src={userImg}
              alt="profile picture"
            />
          ) : (
            <img
              style={{ width: "250px", height: "250px", borderRadius: "50%" }}
              src="https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg"
              alt="profile picture"
            />
          )}
          {currentUser.displayName ? (
            <button
              onClick={handleOpen}
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                marginTop: "1rem",
                fontSize: "1.5rem",
              }}
            >
              {" "}
              Update your username
              <SettingsIcon />
            </button>
          ) : (
            <>
              <Typography variant="h5" style={{ marginTop: "1rem" }}>
                Welcome to Chubby Dog! To get started, please set your username.
              </Typography>
              <button
                onClick={handleOpen}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  marginTop: "1rem",
                  fontSize: "1.5rem",
                }}
              >
                Press here to choose a username
                <SettingsIcon />
              </button>
            </>
          )}
          <Modal open={modalOpen} onClose={handleClose}>
            <Box sx={modalStyle}>
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <DialogContentText>Update your username:</DialogContentText>
                  <TextField
                    autoFocus
                    margin="normal"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={username || ""}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Button variant="contained" type="submit">
                    Update
                  </Button>
                </DialogContent>
              </form>
            </Box>
          </Modal>
          <Typography variant="h2" component="h2" sx={{ marginTop: "1rem" }}>
            {currentUser?.displayName}
          </Typography>

          {/* <Typography variant="h2" component="h2" sx={{ marginTop: "2rem" }}>
            About me
          </Typography>
          <TextField
            sx={{ marginTop: ".5rem" }}
            id="outlined-multiline-static"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /> */}
          <Typography
            variant="h2"
            component="h2"
            sx={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            Your listings
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "4rem",
              width: "100%",
            }}
          >
            {items.map((item: IListItem) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h5">
            You need to be signed in to view this page
          </Typography>
          <Link to="/signin">Sign in now!</Link>
        </>
      )}
    </Box>
  );
}

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
