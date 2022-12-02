import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import ReceivedReqCard from '../Components/ReceivedReqCard';
import { useAuth } from '../Contexts/AuthContext';
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

export default RequestsPage;
