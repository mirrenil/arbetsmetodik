import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { CSSProperties } from 'react';
import test from '../Assets/Images/test.png';

const ItemCard = () => {
	return (
		<>
			<Card sx={boxStyle}>
				<CardMedia
					component="img"
					src={test}
					height="100"
					sx={{ borderRadius: '6px' }}
				/>
				<CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
					<Typography>Test</Typography>
					<Typography>149 kr</Typography>
				</CardContent>
			</Card>
		</>
	);
};
const boxStyle: CSSProperties = {
	width: '10rem',
	height: '10rem',
  padding: '.5rem'
};

export default ItemCard;
