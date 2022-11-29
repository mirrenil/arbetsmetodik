import {
  Box,
  Typography,
  Paper,
  InputBase,
  IconButton,
  SxProps,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import mobileMainHeroImage from "../Assets/Images/mobileMainHeroImage.png";
import MobileHeader from "../Assets/Images/mobileHeader.png";
import DesktopMainHeroImg from "../Assets/Images/DesktopMainHeroImg.png";

const StartPageHero = () => {
  return (
    <>
      <Box>
        {/* Header will go here from layout */}
        <Box sx={mobileBox}>
          <Box sx={headerBackground}>
            <img
              src={MobileHeader}
              alt=""
              style={{ width: "100%", height: "150px" }}
            />
          </Box>
          <Box sx={{ mt: 10 }}>
            <Box sx={logoAndHeroText}>
              <Typography sx={{ fontSize: "1.5em", fontweight: "900" }}>
                Rent <span style={{ color: "#FEBF00" }}>anything</span> <br />{" "}
                from people in <br />
                your area
              </Typography>
              <Typography>
                Borrow almost anything from people nearby for jobs at home, fun
                experiences or work.
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={mobileMainHeroImage} alt="" />
              </Box>
              <Box sx={searchBox}>
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 300,
                    height: 40,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: "12px" }}
                    placeholder="What are you looking for?"
                    inputProps={{ "aria-label": "What are you looking for?" }}
                  />
                  <IconButton
                    type="button"
                    sx={{
                      p: "10px",
                      backgroundColor: "#00C4BA",
                      height: "30px",
                      width: "30px",
                      borderRadius: "5px",
                    }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={desktopBox}>
        <Box sx={DesktopMainHeroImgDiv}>
          <img
            src={DesktopMainHeroImg}
            alt="Hero image"
            style={{ width: "100%", height: "100%", margin: "auto" }}
          />
        </Box>
      </Box>
    </>
  );
};
const mobileBox: SxProps = {
  display: { xs: "block", md: "none", lg: "none", xl: "none" },
  userSelect: "none",
};
const headerBackground: SxProps = {
  position: "absolute",
  top: "60px",
  zIndex: "0",
  width: "100%",
};
const logoAndHeroText: SxProps = {
  width: "300px",
  marginLeft: "2em",
  marginBottom: "2em",
};
const searchBox: SxProps = {
  mt: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const desktopBox: SxProps = {
  display: { xs: "none", md: "block", lg: "block", xl: "block" },
  userSelect: "none",
};
const DesktopMainHeroImgDiv: SxProps = {
  width: "90%",
  margin: "auto",
};
export default StartPageHero;
