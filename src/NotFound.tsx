import { Box, Button, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  const homePage = () => {
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        padding: "4rem",
      }}
    >
      <Typography variant="h3">404</Typography>
      <Typography variant="h2">Oops this page does not exist.</Typography>
      <Button
        variant="contained"
        size="large"
        onClick={homePage}
        sx={{ marginTop: "2rem" }}
      >
        Take me home
      </Button>
    </Box>
  );
};

export default NotFound;
