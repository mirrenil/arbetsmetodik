import { Typography, Box, TextField, Button, Alert } from "@mui/material";
import React, { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/FormStyle.css";
import { useAuth } from "../Contexts/AuthContext";
import GoogleButton from "react-google-button";
// import { db } from "../firebase";
// import { setDoc } from "firebase/firestore";
// import { doc } from "prettier";

function SignUpPage() {
  const {
    signup,
    setRegisterEmail,
    setRegisterPassword,
    googleSignIn,
    currentUser,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<null | HTMLInputElement>(null);
  const navigate = useNavigate();

  // const addUserToDb = async () => {
  //   await setDoc(doc(db, "users", currentUser?.uid), {
  //     name: "Los Angeles",
  //     state: "CA",
  //     country: "USA",
  //   });
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (passwordRef.current?.value !== passwordConfirmationRef.current?.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef, passwordRef);
      // addUserToDb();
      navigate(`/profile/${currentUser?.uid}`);
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
          ref={emailRef}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          required
          ref={passwordRef}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Password confirmation"
          variant="outlined"
          type="password"
          ref={passwordConfirmationRef}
          required
          onChange={(e) => setRegisterPassword(e.target.value)}
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
