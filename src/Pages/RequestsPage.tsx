import { Typography } from '@mui/material';
import React from 'react';
import ReceivedReqCard from '../Components/ReceivedReqCard';
import { useUser } from '../Contexts/UserContext';

function RequestsPage() {
	const { myReceivedRequests, mySentRequests } = useUser();
	
	return (
		<>
			<Typography>Recieved requests:</Typography>
			{myReceivedRequests.map((req) => {
				return <ReceivedReqCard key={req.id} request={req} isMySentRequest={false}/>;
			})}
			<Typography>Sent requests:</Typography>
			{mySentRequests.map((req) => {
				return <ReceivedReqCard key={req.id} request={req} isMySentRequest={true}/>;
			})}
		</>
	);
}

export default RequestsPage;
