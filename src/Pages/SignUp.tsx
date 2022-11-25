import { Facebook } from '@mui/icons-material';
import { Typography, Box, TextField, Button, Alert } from '@mui/material';
import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Assets/FormStyle.css';
import { useAuth } from '../authContext';
import GoogleButton from 'react-google-button';

function SignUpPage() {
	const {
		signup,
		registerEmail,
		setRegisterEmail,
		registerPassword,
		setRegisterPassword,
		googleSignIn,
	} = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await signup(registerEmail, registerPassword);
			navigate('/');
		} catch (error) {
			setError('Failed to create an account');
		}
		setLoading(false);
	};

	const handleGoogleSignIn = (e: FormEvent) => {
		e.preventDefault();
		try {
			googleSignIn();
			navigate('/profile');
		} catch (error) {
			console.error(error);
		}
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
					'& > :not(style)': { m: 1, width: '30ch' },
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
				<TextField id="outlined-basic" label="Firstname" variant="outlined" />
				<TextField id="outlined-basic" label="Lastname" variant="outlined" />
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
					label="Confirm password"
					variant="outlined"
					type="password"
				/>
				<Button
					type="submit"
					color="primary"
					variant="contained"
					sx={{ background: '#00C4BA' }}
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
				<GoogleButton onClick={handleGoogleSignIn} />
			</Box>
		</div>
	);
}

export default SignUpPage;
