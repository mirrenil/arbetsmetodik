import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';
import { CSSProperties } from 'react';
import { Facebook } from '@mui/icons-material';
import '../Assets/FormStyle.css'

function SignInPage() {
	return (
		<div className="wrapper">
			<Typography variant="h4" align="center" mb={5}>
				Welcome to Chubby Dog
			</Typography>
			<Box
				component="form"
				className="box"
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
			>
				<TextField
					id="outlined-basic"
					label="Email"
					variant="outlined"
				/>
				<TextField
					id="outlined-basic"
					label="Password"
					variant="outlined"
					type="password"
				/>
				<Button
					color="primary"
					variant="contained"
					sx={{ background: '#00C4BA' }}
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
				<Button className="buttonStyle" variant="outlined">
					<img
						src={require('../Assets/gmail_logo.png')}
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

export default SignInPage;
