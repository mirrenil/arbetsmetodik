import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import RecentlyAdded from "../Components/RecentlyAdded";

function ProfilePage() {
  const [description, setDescription] = useState("");
  const { currentUser } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        margin: "2rem",
      }}
    >
      {currentUser ? (
        <>
          <img
            style={{ width: "250px", height: "250px", borderRadius: "50%" }}
            src="data:image/jpeg;base64,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"
            alt="profile picture"
          />
          <Typography variant="h1" component="h1" sx={{ marginTop: "1rem" }}>
            {currentUser.email}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ marginTop: "2rem" }}>
            About me
          </Typography>
          <TextField
            sx={{ marginTop: ".5rem" }}
            id="outlined-multiline-static"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography variant="h2" component="h2" sx={{ marginTop: "2rem" }}>
            Your listings
          </Typography>
          <RecentlyAdded />
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

export default ProfilePage;
