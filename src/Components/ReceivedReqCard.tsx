import { Box, CardMedia, SxProps, Typography, useTheme } from '@mui/material';
import React from 'react';
import camera from '../Assets/Images/Film-Photography.png'

const ReceivedReqCard = () => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				boxShadow: '0px 0px 15px -3px #000000',
				width: '25rem',
				height: '15rem',
				borderRadius: theme.shape.buttonBorderRadius,
        margin: 'auto'
			}}
		>
      <CardMedia sx={imgStyle} component="img" src={camera} />
      <Typography>Request from:</Typography>
      <Typography>Request for:</Typography>
		</Box>
	);
};

const imgStyle: SxProps = {
  width: '7rem',
  objectFit: 'scale-down'
}

export default ReceivedReqCard;
