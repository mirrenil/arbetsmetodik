import { Facebook } from '@mui/icons-material';
import { Typography, Box, TextField, Button } from '@mui/material';
import React from 'react';
import '../Assets/FormStyle.css';

function SignUpPage() {
	return (
		<div>
			<Typography variant="h4" align="center" mb={5}>
				New to Chubby Dog?
			</Typography>
			<Box
				component="form"
				className="box"
				sx={{
					'& > :not(style)': { m: 1, width: '30ch' },
				}}
				noValidate
				autoComplete="off"
			>
				<TextField id="outlined-basic" label="Email" variant="outlined" />
				<TextField id="outlined-basic" label="Firstname" variant="outlined" />
				<TextField id="outlined-basic" label="Lastname" variant="outlined" />
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

export default SignUpPage;
