import { FormEvent, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button, Alert } from '@mui/material';
import { Facebook } from '@mui/icons-material';
import '../Assets/FormStyle.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../authContext";
import GoogleButton from 'react-google-button';


function SignInPage() {
	const { login, loginEmail, setLoginEmail, loginPassword, setLoginPassword, googleSignIn} = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
		await login(loginEmail, loginPassword);
		navigate("/profile");
		} catch (error) {
			console.error("login failed" + error);
			
		setError("Failed to sign in");
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
		<div className="wrapper">
			<Typography variant="h4" align="center" mb={5}>
				Welcome to Chubby Dog
			</Typography>
			 {error && <Alert variant="outlined">{error}</Alert>}
			<Box
				component="form"
				className="box"
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
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
					onChange={(e) => setLoginEmail(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Password"
					variant="outlined"
					type="password"
					required
					onChange={(e) => setLoginPassword(e.target.value)}
				/>
				<Button
					color="primary"
					variant="contained"
					sx={{ background: '#00C4BA' }}
					onClick={handleSubmit}
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
				<GoogleButton onClick={handleGoogleSignIn}/>
			</Box>
		</div>
	);
}

export default SignInPage;
