import React, { FormEvent, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, Button, SxProps } from "@mui/material";
import "../Assets/FormStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import GoogleButton from "react-google-button";
import * as yup from "yup";
import { useFormik } from 'formik';

const validationSchema = yup
  .object({
  email: yup
  .string()
  .required('Please enter your email address'),
  password: yup
    .string()
    .required('Please enter a password'),
});

function SignInPage() {
  const { currentUser, login, googleSignIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await login(loginEmail, loginPassword);
      navigate("/profile/:id");
    } catch (error) {
      console.error("login failed" + error);

    }
  };

  const handleGoogleSignIn = (e: FormEvent) => {
    e.preventDefault();
    try {
      googleSignIn();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
        email: "",
        password: "", 
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSignIn()
    },
});

  return (
    <Box sx={wrapper}>
      <Typography variant="h4" align="center" mb={5}>
        Welcome to Chubby Dog
      </Typography>
      {currentUser ? (
        <Typography variant="h5"> You are already signed in</Typography>
      ) : (
        <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", width: "15rem", gap: "1rem" }}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="text"
            value={formik.values.email}
            onChange={ (e) =>{ 
              formik.handleChange(e)
              setLoginEmail( e.target.value)
            }}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={ (e) =>{ 
              formik.handleChange(e)
              setLoginPassword(e.target.value)
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            color="primary"
            variant="contained"
            sx={{ background: "#00C4BA" }}
            type="submit"
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
          </form>
          </Box>
          </Box>
      )}
    </Box>
  );
}

const wrapper: SxProps = {
  flexDirection: "column",
  position: { xs: "static", md: "relative", lg: "relative", xl: "relative" },
  top: { xs: "0", md: "150px", lg: "100px", xl: "100px" },
  width: "100%",
  minHeight: "500px",
  display: "flex",
  justifyContent: "center",
};

export default SignInPage;
