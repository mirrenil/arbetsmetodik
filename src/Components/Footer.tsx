import { Box, SxProps, Typography } from "@mui/material";
import React from "react";
import footerImg from "../Assets/Images/footer.png";
import footer2Img from "../Assets/Images/footer2.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box>
      <Box sx={imgAlign}>
        <img
          src={footerImg}
          alt=""
          style={{ width: "100vw", height: "150px" }}
        />
      </Box>
      <Box sx={mobileContainer}>
        <Box sx={mobileTextAlign}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography sx={textStyleMobile}>About Chubby Dog</Typography>
          </Link>
          <Link to="/howitworks" style={{ textDecoration: "none" }}>
            <Typography sx={textStyleMobile}>How it works</Typography>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography sx={textStyleMobile}>Terms and Conditions</Typography>
          </Link>
        </Box>
        <Box sx={iconAlign}>
          <TwitterIcon sx={iconStyleMobile} />
          <InstagramIcon sx={iconStyleMobile} />
          <FacebookIcon sx={iconStyleMobile} />
        </Box>
      </Box>
      <Box sx={desktopContainer}>
        <Box sx={desktopAlign}>
          <img
            src={footer2Img}
            alt="footer background image"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Box sx={desktopTextAlign}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography sx={textStyle}>About Chubby Dog</Typography>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography sx={textStyle}>How it works</Typography>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography sx={textStyle}>Terms and Conditions</Typography>
          </Link>
        </Box>
        <Box sx={iconAlignDesktop}>
          <TwitterIcon sx={iconStyleDesktop} />
          <InstagramIcon sx={iconStyleDesktop} />
          <FacebookIcon sx={iconStyleDesktop} />
        </Box>
      </Box>
    </Box>
  );
};

const desktopContainer: SxProps = {
  position: "relative",
  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
};
const textStyleMobile: SxProps = {
  marginBottom: "30px",
  color: "00C4BA",
  fontWeight: "bold",
  "a:visted": {
    color: "#00C4BA",
  },
};
const textStyle: SxProps = {
  marginBottom: "30px",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    color: "#FEBF00",
  },
  "a:visted": {
    color: "#00C4BA",
  },
};
const mobileContainer: SxProps = {
  display: { xs: "flex", md: "none", lg: "none", xl: "none" },
  flexDirection: "column",
  paddingBottom: "20px",
};
const desktopTextAlign: SxProps = {
  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
  flexDirection: "column",
  position: "absolute",
  bottom: { xs: "none", md: "0", lg: "10px", xl: "30px" },
  left: "60px",
  fontSize: { xs: "none", md: "20px", lg: "30px", xl: "30px" },
  boxSizing: "border-box",
};
const mobileTextAlign: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "10px",
  marginLeft: "50px",
};
const imgAlign: SxProps = {
  display: { xs: "flex", md: "none", lg: "none", xl: "none" },
};
const desktopAlign: SxProps = {
  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
  width: "100%",
};
const iconAlign: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "10px",
  marginTop: "10px",
};
const iconAlignDesktop: SxProps = {
  display: "flex",
  flexDirection: "row",
  position: "absolute",
  bottom: "30px",
  right: { xs: "none", md: "200px", lg: "200px", xl: "300px" },
};
const iconStyleDesktop: SxProps = {
  fontSize: { xs: "none", md: "60px", lg: "70px", xl: "70px" },
  color: "white",
  cursor: "pointer",
  "&:hover": {
    color: "#FEBF00",
  },
};

const iconStyleMobile: SxProps = {
  fontSize: { xs: "none", md: "60px", lg: "70px", xl: "70px" },
  color: "#00C4BA",
};
export default Footer;
