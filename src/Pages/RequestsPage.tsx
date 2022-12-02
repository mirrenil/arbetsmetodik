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
