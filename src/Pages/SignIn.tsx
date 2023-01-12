import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, Button, SxProps } from "@mui/material";
import "../Assets/FormStyle.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";

const emailRules =
    // eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(6, "The password must be atleast 6 characters")
        .required("Please enter a password"),
});

function SignInPage() {
    const { currentUser, login, errorMessage } = useAuth();
    const [loginEmail, setLoginEmail] = useState<string>("");
    const [loginPassword, setLoginPassword] = useState<string>("");
    const [buttonEnabled, setButtonEnabled] = useState<boolean>();

    useEffect(() => {
        checkFields();
    });

    const checkFields = () => {
        if (
            loginEmail.length &&
            emailRules.test(loginEmail) &&
            loginPassword.length
        ) {
            setButtonEnabled(false);
        } else {
            setButtonEnabled(true);
        }
    };

    const handleSignIn = async () => {
        try {
            await login(loginEmail, loginPassword);
        } catch (error) {
            console.error("login failed" + error);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit: (values) => {
            handleSignIn();
        },
    });

    return (
        <Box sx={wrapper}>
            <ToastContainer />
            <Typography variant="h4" align="center" mb={5}>
                Welcome to Chubby Dog
            </Typography>
            {currentUser ? (
                <Typography variant="h5" align="center">
                    {" "}
                    You are already signed in
                </Typography>
            ) : (
                <Box>
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
                                    setLoginEmail(e.target.value);
                                }}
                                error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                            />
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    setLoginPassword(e.target.value);
                                }}
                                error={
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                }
                                helperText={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                            />
                            <Button
                                id="button"
                                color="primary"
                                variant="contained"
                                sx={{ background: "#00C4BA" }}
                                type="submit"
                                disabled={buttonEnabled}
                            >
                                Sign in
                            </Button>
                            {errorMessage ? (
                                <Typography align="center" color="red">
                                    Email and password do not match
                                </Typography>
                            ) : null}
                            <Link to="/signup">
                                <Typography>
                                    Don&apos;t have an account? Sign up here!
                                </Typography>
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
    minHeight: "700px",
    display: "flex",
    justifyContent: "center",
    zIndex: "100",
};

export default SignInPage;
