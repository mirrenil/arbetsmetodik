/* eslint-disable */
import { Box, SxProps, Typography } from "@mui/material";
import React from "react";
import RequestCard from "../Components/RequestCard";
import { useUser } from "../Contexts/UserContext";

function RequestsPage() {
  const { myReceivedRequests, mySentRequests } = useUser();

  return (
    <>
      <Box sx={wrapper}>
        <Typography>Recieved requests:</Typography>
        {myReceivedRequests.map((req) => {
          return (
            <RequestCard key={req.id} request={req} isMySentRequest={false} />
          );
        })}
        <Typography>Sent requests:</Typography>
        {mySentRequests.map((req) => {
          return (
            <RequestCard key={req.id} request={req} isMySentRequest={true} />
          );
        })}
      </Box>
    </>
  );
}

const wrapper: SxProps = {
  margin: '7rem 0',
  minHeight: '100%'
}

export default RequestsPage;
