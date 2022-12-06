import React, { FormEvent, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, Button, Alert } from "@mui/material";
import "../Assets/FormStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import GoogleButton from "react-google-button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignInPage() {
  const { currentUser, login, setLoginEmail, setLoginPassword, googleSignIn } =
    useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(emailRef, passwordRef);
      if (currentUser) {
        navigate("/profile/:id");
        toast.success("You are now signed in", {
          autoClose: 1000,
        });
      } else {
        toast.warn("Failed to sign in", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("login failed" + error);
      setError("Failed to sign in");
      toast.warn("Failed to sign in", {
        autoClose: 1500,
        theme: "colored",
      });
    }
    setLoading(false);
  };

  const handleGoogleSignIn = (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      googleSignIn();
      navigate("/");
      toast.success("You are now signed in", {
        autoClose: 1000,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
      toast.warn("Failed to sign in", {
        autoClose: 1500,
      });
    }
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <ToastContainer />

      <Typography variant="h4" align="center" mb={5}>
        Welcome to Chubby Dog
      </Typography>
      {currentUser ? (
        <Typography variant="h5"> You are already signed in</Typography>
      ) : (
        <Box
          component="form"
          className="box"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
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
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            required
            ref={passwordRef}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            color="primary"
            variant="contained"
            sx={{ background: "#00C4BA" }}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
          <Typography variant="body1" align="center">
            OR
          </Typography>

          <GoogleButton onClick={handleGoogleSignIn} />
          <Link to="/signup">
            <Typography>Don&apos;t have an account? Sign up here!</Typography>
          </Link>
        </Box>
      )}
    </div>
  );
}

export default SignInPage;
