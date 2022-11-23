import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';
import { CSSProperties } from 'react';
import { Facebook } from '@mui/icons-material';

function SignInPage() {
	return (
		<div style={wrapper}>
			<Typography variant="h4" align="center" mb={5}>
				Welcome to Chubby Dog
			</Typography>
			<Box
				component="form"
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
				noValidate
				autoComplete="off"
			>
				<TextField
					id="outlined-basic"
					label="Email or username"
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
				<Button sx={buttonStyle} variant="contained">
					<Facebook style={iconStyle} />
					Continue with Facebook
				</Button>
				<Button sx={buttonStyle} variant="outlined">
					<img
						src={require('../Assets/gmail_logo.png')}
						alt="fireSpot"
						style={iconStyle}
						height="14px"
					/>
					Continue with Gmail
				</Button>
			</Box>
		</div>
	);
}

const wrapper: CSSProperties = {
	margin: '3rem',
};

const buttonStyle: CSSProperties = {
	display: 'flex',
	textTransform: 'none',
};
const iconStyle: CSSProperties = {
	marginRight: '.5rem',
};

export default SignInPage;
