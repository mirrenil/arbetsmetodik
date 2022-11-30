import { Box, SxProps, Typography } from '@mui/material';
import { CSSProperties } from '@mui/styled-engine';
import React from 'react';
import { useAuth } from '../authContext';
import ReceivedReqCard from '../Components/ReceivedReqCard';

function RequestsPage() {
	const { currentUser } = useAuth();

	return (
		<Box sx={wrapper}>
			<Typography variant="h2">Recieved requests:</Typography>

      <Typography variant="h2">Sent requests:</Typography>
		</Box>
	);
}
const wrapper: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}
export default RequestsPage;
