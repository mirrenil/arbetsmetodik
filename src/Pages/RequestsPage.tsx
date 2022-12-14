/* eslint-disable */
import { Box, Button, SxProps, Typography } from "@mui/material";
import React from "react";
import RequestCard from "../Components/RequestCard";
import { useUser } from "../Contexts/UserContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function RequestsPage() {
    const { myReceivedRequests, mySentRequests } = useUser();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            {currentUser ? (
                <Box sx={wrapper}>
                    <Typography sx={titleStyle}>Recieved requests:</Typography>
                    {myReceivedRequests.length ? (
                        <Box sx={cardsContainer}>
                            {myReceivedRequests.map((req) => {
                                return (
                                    <RequestCard
                                        key={req.id}
                                        request={req}
                                        isMySentRequest={false}
                                    />
                                );
                            })}
                            {myReceivedRequests.length > 1 ? (
                                <ArrowForwardIosIcon
                                    style={{
                                        position: "sticky",
                                        right: "10px",
                                        color: "black",
                                    }}
                                />
                            ) : null}
                        </Box>
                    ) : null}
                    <Typography sx={titleStyle}>Sent requests:</Typography>
                    <Box sx={cardsContainer}>
                        {mySentRequests.map((req) => {
                            return (
                                <RequestCard
                                    key={req.id}
                                    request={req}
                                    isMySentRequest={true}
                                />
                            );
                        })}
                        {mySentRequests.length > 1 ? (
                            <ArrowForwardIosIcon
                                style={{
                                    position: "sticky",
                                    right: "10px",
                                    color: "black",
                                }}
                            />
                        ) : null}
                    </Box>
                </Box>
            ) : (
                <Box sx={notSignedIn}>
                    <Typography align="center" variant="h6">
                        You are not signed in, please sign in to be able to send
                        a booking request.
                    </Typography>
                    <Button
                        sx={button}
                        variant="contained"
                        onClick={() => navigate("/signin")}
                    >
                        Sign in
                    </Button>
                </Box>
            )}
        </>
    );
}

const wrapper: SxProps = {
    margin: "7rem 0",
    minHeight: "100%",
};
const titleStyle: SxProps = {
    textAlign: "center",
    fontSize: { xs: "1.2rem", md: "2rem" },
    marginTop: { xs: "none", md: "12rem", lg: "2rem", xl: "2rem" },
    marginBottom: "1rem",
};

const cardsContainer: SxProps = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "20rem",
    overflowX: "auto",
    position: "relative",
};
const notSignedIn: SxProps = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "20rem",
    position: "relative",
    flexDirection: "column",
    mt: 30,
};
const button: SxProps = {
    marginTop: "1rem",
    marginBottom: "2rem",
    width: "30%",
    height: "15%",
    color: "white",
};

export default RequestsPage;
