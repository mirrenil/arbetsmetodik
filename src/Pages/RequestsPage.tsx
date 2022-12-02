import { Typography } from '@mui/material';
import React from 'react';
import ReceivedReqCard from '../Components/ReceivedReqCard';
import { useUser } from '../Contexts/UserContext';

function RequestsPage() {
	const { usersRequests } = useUser();
	
	return (
		<div>
			<Typography>Recieved requests:</Typography>
			{usersRequests.map((req) => {
				return <ReceivedReqCard key={req.id} request={req}/>;
			})}
		</div>
	);
}
const wrapper: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}
export default RequestsPage;
