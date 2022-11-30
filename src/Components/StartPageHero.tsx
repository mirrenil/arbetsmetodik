import {
  Box,
  Typography,
  Paper,
  InputBase,
  IconButton,
  SxProps,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import logoImg from "../Assets/Images/logo.png";

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
                    <SearchIcon sx={{fill: '#FFFFFF'}}/>
                  </IconButton>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={desktopBox}>
      <Box sx={mainLogoDiv}>
          <Box sx={deskMainLogo}>
            <Avatar alt="Logo" src={logoImg} sx={mainLogo} />
            <Typography sx={mainDeskText}>
              Lorem impsum dolor sit amet bla{" "}
            </Typography>
            <Typography sx={deskText}>
              Borrow almost anything from people nearby for jobs at home, fun
              experiences or work.
            </Typography>
          </Box>
        </Box>
        <Box sx={DesktopMainHeroImgDiv}>
        <Box
          component="img"
          sx={{
            width: "100%", 
            height: "100%", 
            margin: "auto"
          }}
          alt="Hero image"
          src={DesktopMainHeroImg}
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
const mainLogoDiv: SxProps = {
  // width: '1
  display: { xs: 'none', md:'flex', lg: 'flex', xl: 'flex' },
  textAlign: 'center',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}
const deskMainLogo: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  mt: {xs: 'none', md: '5em', lg: '0em', xl: '0em'}
}
const mainLogo: SxProps = {
  width: "200px",
  height: "200px",
};
const mainDeskText: SxProps = {
  color: "black",
  marginTop: "1em",
  fontSize: "1.5em",
  fontweight: "bold",
};
const deskText: SxProps = {
  color: "black",
};
const DesktopMainHeroImgDiv: SxProps = {
  // float: 'right',
  width: "50%",
  margin: "auto",
  mt: '2em',
};
export default StartPageHero;
