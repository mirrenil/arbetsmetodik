import {
    Box,
    Typography,
    Paper,
    InputBase,
    IconButton,
    SxProps,
    Avatar,
} from "@mui/material";
import React from "react";
import logoImg from "../Assets/Images/logo.png";
import mobileMainHeroImage from "../Assets/Images/mobileMainHeroImage.png";
import DesktopMainHeroImg from "../Assets/Images/DesktopMainHeroImg.png";

const StartPageHero = () => {
    return (
        <>
            <Box>
                <Box sx={mobileBox}>
                    <Box sx={{ mt: 10 }}>
                        <Box sx={logoAndHeroText}>
                            <Typography
                                sx={{ fontSize: "1.5em", fontweight: "900" }}
                            >
                                Rent
                                <span style={{ color: "#FEBF00" }}>
                                    anything
                                </span>
                                <br /> from people in <br />
                                your area
                            </Typography>
                            <Typography>
                                Rent almost anything from people nearby for jobs
                                at home, fun experiences or work.
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
                                <img
                                    src={mobileMainHeroImage}
                                    alt="mobile hero image"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={desktopBox}>
                <Box sx={mainLogoDiv}>
                    <Box sx={deskMainLogo}>
                        <Avatar alt="Logo" src={logoImg} sx={mainLogo} />
                        <Typography sx={mainDeskText}>Chubby Dog</Typography>
                        <Typography sx={deskText}>
                            Rent almost anything from people nearby for jobs at
                            home, fun experiences or work.
                        </Typography>
                    </Box>
                </Box>
                <Box sx={DesktopMainHeroImgDiv}>
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                            height: "100%",
                            margin: "auto",
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

const logoAndHeroText: SxProps = {
    width: "300px",
    marginLeft: "2em",
    marginBottom: "2em",
};

const desktopBox: SxProps = {
    display: { xs: "none", md: "block", lg: "block", xl: "block" },
    userSelect: "none",
};
const mainLogoDiv: SxProps = {
    display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
    textAlign: "center",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
};
const deskMainLogo: SxProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    mt: { xs: "none", md: "5em", lg: "0em", xl: "0em" },
};
const mainLogo: SxProps = {
    width: "200px",
    height: "200px",
};
const mainDeskText: SxProps = {
    color: "black",
    marginTop: ".3rem",
    fontSize: "2.5rem",
    fontweight: "bold",
};
const deskText: SxProps = {
    width: "50%",
    color: "black",
    fontSize: "1.5rem",
};
const DesktopMainHeroImgDiv: SxProps = {
    width: "50%",
    margin: "auto",
    mt: "2em",
};

export default StartPageHero;
