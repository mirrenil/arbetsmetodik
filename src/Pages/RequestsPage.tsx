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
        <Typography sx={recievedStyle}>Recieved requests:</Typography>
        {myReceivedRequests.map((req) => {
          return (
            <RequestCard key={req.id} request={req} isMySentRequest={false} />
          );
        })}
        <Typography sx={sentStyle}>Sent requests:</Typography>
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
  margin: "7rem 0",
  minHeight: "100%",
};
const recievedStyle: SxProps = {
  textAlign: "center",
  fontSize: "2rem",
  marginTop: { xs: "none", md: "12rem", lg: "2rem", xl: "2rem" },
  marginBottom: "3rem",
};
const sentStyle: SxProps = {
  textAlign: "center",
  fontSize: "2rem",
  marginBottom: "3rem",
};

export default RequestsPage;
