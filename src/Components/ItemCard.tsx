import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { CSSProperties } from 'react';
import { IlistItem } from '../Interfaces';

interface Props {
  item: IlistItem
}

const ItemCard = ({item}: Props) => {

	return (
		<>
			<Card sx={boxStyle}>
				<CardMedia
					component="img"
					src={item.image}
					height="100"
					sx={{ borderRadius: '6px' }}
				/>
				<CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography>{item.title}</Typography>
					<Typography>{item.price} :-</Typography>
				</CardContent>
			</Card>
		</>
	);
};
const boxStyle: CSSProperties = {
	width: '10rem',
	height: '10rem',
	padding: '.5rem',
};

export default ItemCard;
