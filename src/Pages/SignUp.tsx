import { Typography, Box, TextField, Button, Alert } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/FormStyle.css";
import { useAuth } from "../Contexts/AuthContext";
import GoogleButton from "react-google-button";

function SignUpPage() {
  const { signup, googleSignIn, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmationPassword, setConfirmationPassword] = useState<string>("");
  const [displayName, setDisplayedName] = useState<string>("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmationPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, displayName);
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
    navigate(`/profile/${currentUser?.uid}`);
  };

  const handleGoogleSignIn = (e: FormEvent) => {
    e.preventDefault();
    try {
      googleSignIn();
      navigate(`/profile/${currentUser?.uid}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        mt: { xs: 4, md: 10, lg: 10, xl: 10 },
      }}
    >
      <Typography variant="h4" align="center" mb={5}>
        New to Chubby Dog?
      </Typography>
      <Box
        component="form"
        className="box"
        sx={{
          "& > :not(style)": { m: 1, width: "30ch" },
        }}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Display name"
          variant="outlined"
          required
          onChange={(e) => setDisplayedName(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Password confirmation"
          variant="outlined"
          type="password"
          required
          onChange={(e) => setConfirmationPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ background: "#00C4BA" }}
          className="buttonStyle"
        >
          Sign up
        </Button>
        <Typography variant="body1" align="center">
          OR
        </Typography>
        <GoogleButton onClick={handleGoogleSignIn} />
      </Box>
    </Box>
  );
}

export default SignUpPage;
