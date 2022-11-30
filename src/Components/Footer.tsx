import { Box, SxProps } from "@mui/material";
import React from "react";
import footerImg from "../Assets/Images/footer.png";
import footer2Img from "../Assets/Images/footer2.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

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
          <Box>About Chubby Dog</Box>
          <Box>How it works</Box>
          <Box>Terms and conditions</Box>
        </Box>
        <Box sx={iconAlign}>
          <TwitterIcon />
          <InstagramIcon />
          <FacebookIcon />
        </Box>
      </Box>
      <Box sx={desktopContainer}>
        <Box sx={desktopAlign}>
          <img
            src={footer2Img}
            alt=""
            style={{ width: "100vw", height: "auto" }}
          />
        </Box>
        <Box sx={desktopTextAlign}>
          <Box sx={textStyle}>About Chubby Dog</Box>
          <Box sx={textStyle}>How it works</Box>
          <Box sx={textStyle}>Terms and conditions</Box>
        </Box>
        <Box sx={iconAlignDesktop}>
          <TwitterIcon sx={iconStyle} />
          <InstagramIcon sx={iconStyle} />
          <FacebookIcon sx={iconStyle} />
        </Box>
      </Box>
    </Box>
  );
};

const desktopContainer: SxProps = {
  position: "relative",
  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
};
const textStyle: SxProps = {
  marginBottom: "30px",
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
const iconStyle: SxProps = {
  fontSize: { xs: "none", md: "60px", lg: "70px", xl: "70px" },
};
export default Footer;
