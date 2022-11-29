import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { CSSProperties, useContext } from 'react';
import { ListItem } from '../Interfaces';
import { useItems } from "../Contexts/ItemContext";
import { useParams } from 'react-router-dom';

interface Props {
  item: ListItem
}

const ItemCard = ({item} : Props) => (
		<>
			<Card sx={boxStyle}>
				<CardMedia
					component="img"
					src={item.image}
					height="100"
					sx={{ borderRadius: '6px' }}
				/>
				<CardContent 
				sx={{ display: 'flex', justifyContent: 'space-between' }}
				
				>
					<Typography>{item.title}</Typography>
					<Typography>{item.price} :-</Typography>
				</CardContent>
			</Card>
		</>
	);

const boxStyle: CSSProperties = {
	width: '10rem',
	height: '10rem',
	padding: '.5rem',
};

export default ItemCard;
