import { Typography } from '@mui/material';
import React from 'react';
import ReceivedReqCard from '../Components/ReceivedReqCard'

function RequestsPage() {
  return (
    <div>
      <Typography>Recieved requests:</Typography>
      {/* for each request current user has */}
      <ReceivedReqCard />
    </div>
  );
}

export default RequestsPage;
