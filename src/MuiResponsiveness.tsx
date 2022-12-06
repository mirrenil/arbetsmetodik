import { Box, styled } from "@mui/material";

// Orange
const BoxOne = styled(Box)(({ theme }) => ({
  height: "250px",
  width: "250px",
  backgroundColor: theme.palette.secondary.main,
  borderRadius: theme.shape.buttonBorderRadius,
}));

//Blå
const BoxTwo = styled(Box)(({ theme }) => ({
  height: "250px",
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.buttonBorderRadius,
}));

export const TestComponent = () => {
  return (
    <>
      <BoxOne />
      <BoxTwo
        sx={{
          width: {
            xs: 100,
            sm: 200,
            md: 300,
            lg: 400,
            xl: 500,
          },
        }}
      />
    </>
  );
};
