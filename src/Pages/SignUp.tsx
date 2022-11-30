import { Facebook } from "@mui/icons-material";
import { Typography, Box, TextField, Button, Alert } from "@mui/material";
import React, { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/FormStyle.css";
import { useAuth } from "../Contexts/authContext";
import GoogleButton from "react-google-button";

function SignUpPage() {
  const {
    signup,
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    googleSignIn,
    passwordConfirmation,
    setPasswordConfirmation,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (registerPassword !== passwordConfirmation)
      return setError("Passwords do not match");

    try {
      setError("");
      setLoading(true);
      await signup(registerEmail, registerPassword);
      navigate("/");
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = (e: FormEvent) => {
    e.preventDefault();
    try {
      googleSignIn();
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <TextField id="outlined-basic" label="First name" variant="outlined" />
        <TextField id="outlined-basic" label="Last name" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          required
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password confirmation"
          variant="outlined"
          type="password"
          required
          onChange={(e) => setPasswordConfirmation(e.target.value)}
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
    </div>
  );
}

export default SignUpPage;
