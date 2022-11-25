import { Facebook } from "@mui/icons-material";
import { Typography, Box, TextField, Button, Alert } from "@mui/material";
import React, { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/FormStyle.css";
import { useAuth } from "../authContext";

function SignUpPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { signup, setRegisterEmail, setRegisterPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (passwordRef.current?.value !== passwordRef.current?.value) {
      return alert("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current?.value, passwordRef.current?.value);
      navigate("/");
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  };
  return (
    <div>
      <Typography variant="h4" align="center" mb={5}>
        New to Chubby Dog?
      </Typography>
	  {error && <Alert variant="outlined">{error}</Alert>}
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
        <TextField id="outlined-basic" label="Firstname" variant="outlined" />
        <TextField id="outlined-basic" label="Lastname" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          required
          ref={passwordRef}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ background: "#00C4BA" }}
          className="buttonStyle"
        >
          Sign in
        </Button>
        <Typography variant="body1" align="center">
          OR
        </Typography>
        <Button className="buttonStyle" variant="contained">
          <Facebook className="iconStyle" />
          Continue with Facebook
        </Button>
        <Button variant="outlined" className="buttonStyle">
          <img
            src={require("../Assets/gmail_logo.png")}
            alt="fireSpot"
            className="iconStyle"
            height="14px"
          />
          Continue with Gmail
        </Button>
      </Box>
    </div>
  );
}

export default SignUpPage;
