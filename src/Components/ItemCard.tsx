import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { CSSProperties, useContext } from 'react';
import { ListItem } from '../Interfaces';
import  {APIContext }  from "../Contexts/ItemContext";
import { useParams } from 'react-router-dom';

interface Props {
  item: ListItem
}

const ItemCard = () => {

	const ctx = useContext(APIContext);
  const allItems = ctx.items
	console.log('allItems', allItems);
	
	let { itemId } = useParams();  
  const item = allItems.find((item: any) => item.id === itemId);
	console.log('item', item);
	
	return (
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
};
const boxStyle: CSSProperties = {
	width: '10rem',
	height: '10rem',
	padding: '.5rem',
};

export default ItemCard;
