import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReceivedReqCard from '../Components/ReceivedReqCard';
import { useAuth } from '../authContext';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../firebase';
import { IRequest } from '../Interfaces';

function RequestsPage() {
	const { currentUser, usersRequests } = useAuth();

	return (
		<div>
			<Typography>Recieved requests:</Typography>
			{usersRequests.map((req) => {
				return <ReceivedReqCard key={req.itemId + req.fromUser} request={req} user={currentUser}/>;
			})}
		</div>
	);
}

export default RequestsPage;
