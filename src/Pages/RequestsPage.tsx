import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReceivedReqCard from '../Components/ReceivedReqCard';
import { useAuth } from '../authContext';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../firebase';
import { IRequest } from '../Interfaces';

function RequestsPage() {
	const [myRequests, setMyRequests] = useState<IRequest[]>();
	const { currentUser } = useAuth();
	console.log(currentUser?.uid);

	const getAllData = async () => {
		const data = query(
			collection(db, 'requests'),
			where('toUser', '==', `${currentUser?.uid}`)
		);
		const req = await getDocs(data);
		req.forEach((doc) => {
			//set myRequest
		});
	};

	getAllData();

	return (
		<div>
			<Typography>Recieved requests:</Typography>
			<ReceivedReqCard />
		</div>
	);
}

export default RequestsPage;
