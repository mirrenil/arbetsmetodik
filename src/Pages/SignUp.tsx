import { Typography, Box, TextField, Button } from "@mui/material";
import React, { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/FormStyle.css";
import { useAuth } from "../Contexts/AuthContext";
import GoogleButton from "react-google-button";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  email: yup.string().required("Please enter your email address"),
  password: yup.string().required("Please enter a password"),
  confirmPassword: yup.string().required("Please confirm your password"),
});

function SignUpPage() {
  const { signup, setRegisterEmail, setRegisterPassword, googleSignIn } =
    useAuth();
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<null | HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (passwordRef.current?.value !== passwordConfirmationRef.current?.value) {
      return console.log("Passwords do not match");
    }
    try {
      await signup(emailRef, passwordRef);
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = (e: FormEvent) => {
    e.preventDefault();
    try {
      googleSignIn();
      navigate("/profile/`$currentUser.uid`");
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    // eslint-disable-next-line
    onSubmit: (values) => {
      handleSignup();
    },
  });

  return (
    <Box
      sx={{
        mt: { xs: 4, md: 10, lg: 10, xl: 10 },
      }}
    >
      <Typography variant="h4" align="center" mb={5}>
        New to Chubby Dog?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "15rem",
            gap: "1rem",
          }}
        >
          <TextField
            id="email"
            name="email"
            label="Email"
            type="text"
            value={formik.values.email}
            onChange={(e) => {
              formik.handleChange(e);
              setRegisterEmail(e.target.value);
            }}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            ref={emailRef}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              setRegisterPassword(e.target.value);
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            ref={passwordRef}
          />

          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ background: "#00C4BA", color: "white" }}
            className="buttonStyle"
          >
            Sign up
          </Button>
          <Typography variant="body1" align="center">
            OR
          </Typography>
          <GoogleButton
            label="Sign up with Google"
            type="light"
            onClick={handleGoogleSignIn}
          />
        </form>
      </Box>
    </Box>
  );
}

export default SignUpPage;
