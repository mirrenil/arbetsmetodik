import { Box, SxProps } from "@mui/material";
import { Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import GavelIcon from "@mui/icons-material/Gavel";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import backGroundImg from "../Assets/Images/DesktopHeaderBackground.png";
import logoImg from "../Assets/Images/logo.png";
import { useAuth } from "../Contexts/AuthContext";
import MobileHeader from "../Assets/Images/mobileHeader.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const userImg: any = currentUser?.photoURL;
  const userName: any = currentUser?.displayName;

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const navigate = useNavigate();

  const handleSubmit = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={navBox}>
      <Box sx={headerBackground}>
        <Box
          component="img"
          src={MobileHeader}
          alt=""
          sx={{ 
            height: "170px",
          }}
        />
      </Box>
      <Box sx={navBoxInnerMobile}>
        <Box sx={logo}>
          <Link to="/">
            <Avatar alt="Logo" src={logoImg} sx={logoImgStyle} />
          </Link>
        </Box>
        <Box>
          <Box sx={navItems}>
            <Link to="/newlisting" style={{ textDecoration: "none" }}>
              <AddCircleOutlineIcon
                sx={{
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                  fill: "#ffffff",
                }}
              />
            </Link>
            {currentUser ? (
              <Box>
                <Link to="/profile/:id" style={{ textDecoration: "none" }}>
                  {userImg ? (
                    <Box
                      component="img"
                      src={userImg}
                      alt={userName}
                      sx={{
                        cursor: "pointer",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50px",
                      }}
                    />
                  ) : (
                    <Box
                      component="img"
                      src="https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg"
                      alt={userName}
                      sx={{
                        cursor: "pointer",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50px",
                      }}
                    />
                  )}
                </Link>
              </Box>
            ) : (
              <Link to="/profile/:id" style={{ textDecoration: "none" }}>
                <AccountCircleIcon
                  sx={{
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                    fill: "#ffffff",
                  }}
                />
              </Link>
            )}
            <MenuIcon
              onClick={() =>
                menuOpen ? setMenuOpen(false) : setMenuOpen(true)
              }
              sx={{
                cursor: "pointer",
                width: "30px",
                height: "30px",
                fill: "#ffffff",
              }}
            />
          </Box>
        </Box>
      </Box>
      {menuOpen ? (
        <Box
          sx={mobileMenuList}
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-duration="1000"
        >
          <Box sx={UlDiv}>
            <ul
              style={{ listStyle: "none", marginTop: "4em" }}
              data-aos="fade-left"
              data-aos-offset="200"
              data-aos-duration="1000"
            >
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Box sx={navItem} onClick={() => setMenuOpen(false)}>
                  <SensorOccupiedIcon sx={navMenuIcon} />
                  <Typography sx={navItemText}>Sign Up</Typography>
                </Box>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Box sx={navItem} onClick={() => setMenuOpen(false)}>
                  <HelpOutlineIcon sx={navMenuIcon} />
                  <Typography sx={navItemText}>How it works?</Typography>
                </Box>
              </Link>
              {currentUser ? (
                <Link to="/requests" style={{ textDecoration: "none" }}>
                  <Box sx={navItem}>
                    <AddCircleOutlineIcon sx={navMenuIcon} />
                    <Typography sx={navItemText}>My requests</Typography>
                  </Box>
                </Link>
              ) : null}

              <Link to="/" style={{ textDecoration: "none" }}>
                <Box sx={navItem} onClick={() => setMenuOpen(false)}>
                  <GavelIcon sx={navMenuIcon} />
                  <Typography sx={navItemText}>Terms of use</Typography>
                </Box>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Box sx={navItem} onClick={() => setMenuOpen(false)}>
                  <ContactPhoneIcon sx={navMenuIcon} />
                  <Typography sx={navItemText}>Contact</Typography>
                </Box>
              </Link>
              <Link to="/newlisting" style={{ textDecoration: "none" }}>
                <Box sx={navItem} onClick={() => setMenuOpen(false)}>
                  <AddCircleOutlineIcon sx={navMenuIcon} />
                  <Typography sx={navItemText}>List an Item</Typography>
                </Box>
              </Link>
              {currentUser ? (
                <>
                  <Box
                    sx={navItem}
                    onClick={() => {
                      setMenuOpen(false);
                      handleSubmit();
                    }}
                  >
                    <LoginIcon sx={navMenuIcon} />
                    <Typography sx={navItemText}>Logout</Typography>
                  </Box>
                </>
              ) : (
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  <Box sx={navItem} onClick={() => setMenuOpen(false)}>
                    <LoginIcon sx={navMenuIcon} />
                    <Typography sx={navItemText}>Login</Typography>
                  </Box>
                </Link>
              )}
            </ul>
          </Box>
        </Box>
      ) : null}
      <Box sx={navBoxDesk}>
        <Box>
          <img
            src={backGroundImg}
            alt=""
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "400px",
            }}
          />
        </Box>
        <Box sx={navBoxInnerDesk}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "#f1f1f1",
                fontSize: "50px",
                fontWeight: "bold",
                ml: "10px",
                cursor: "pointer",
              }}
            >
              Chubby Dog
            </Typography>
          </Link>
          <Box sx={navItemsDesk}>
            <Link to="/howItWorks" style={{ textDecoration: "none" }}>
              <Typography sx={itemsDesk}>How it works</Typography>
            </Link>
            <Link to="/requests" style={{ textDecoration: "none" }}>
              <Typography sx={itemsDesk}>My requests</Typography>
            </Link>
            <Link to="/newlisting" style={{ textDecoration: "none" }}>
              <Typography sx={itemsDesk}>List an Item</Typography>
            </Link>
            {currentUser ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Link to="/profile/:id" style={{ textDecoration: "none" }}>
                    {userImg ? (
                      <Box
                        component="img"
                        src={userImg}
                        alt={userName}
                        sx={{
                          cursor: "pointer",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50px",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          cursor: "pointer",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50px",
                        }}
                      >
                        <Typography sx={{ color: "#000" }}>
                          {userName}
                        </Typography>
                      </Box>
                    )}
                  </Link>
                  <Box sx={{ marginLeft: "1rem" }} onClick={handleSubmit}>
                    <Typography sx={itemsDesk}>Logout</Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Box>
                  <Typography sx={itemsDesk}>Login</Typography>
                </Box>
              </Link>
            )}
          </Box>
        </Box>
        <Box sx={searchBox}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 250,
              height: 25,
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
                height: "23px",
                width: "30px",
                borderRadius: "5px",
              }}
              aria-label="search"
            >
              <SearchIcon sx={{ fill: "#FFFFFF" }} />
            </IconButton>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

const navBox: SxProps = {
  height: { xs: "100px", md: "100px", lg: "200px", xl: "200px" },
  width: "100%",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
};
const navBoxInnerMobile: SxProps = {
  width: "100%",
  display: { xs: "flex", md: "none", lg: "none", xl: "none" },
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: "3",
  position: "absolute",
  top: "-15px",
};
const headerBackground: SxProps = {
  display: { xs: "block", md: "none", lg: "none", xl: "none" },
  position: "absolute",
  top: "-5px",
  width: "100%",
  zIndex: "2",
  // height: "100px",
  overflowX: "hidden",
};
const navItems: SxProps = {
  width: "150px",
  alignItems: "center",
  justifyContent: "space-between",
  mr: "1em",
  display: { xs: "flex", md: "none", lg: "none", xl: "none" },
};
const logo: SxProps = {
  width: "100px",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "3",
};
const logoImgStyle: SxProps = {};

const mobileMenuList: SxProps = {
  width: "250px",
  height: "400px",
  display: { xs: "flex", md: "none", lg: "none", xl: "none" },
  alignItems: "flex-start",
  justifyContent: "center",
  position: "absolute",
  right: "0",
  top: "100px",
  backgroundColor: "rgb(255, 255, 255)",
  borderRadius: "5px",
  zIndex: "1",
};
const UlDiv: SxProps = {
  backgroundColor: "rgb(255, 255, 255)",
  mt: "20%",
};
const navItem: SxProps = {
  marginTop: "1em",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "",
  width: "200px",
};
const navItemText: SxProps = {
  fontWeight: "bold",
  color: "#000",
  marginLeft: "1em",
};
const navMenuIcon: SxProps = {
  color: "#000",
};

const navBoxDesk: SxProps = {
  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
  width: "100%",
  height: "100px",
  alignItems: "center",
  justifyContent: "center",
};
const navBoxInnerDesk: SxProps = {
  zIndex: "1",
  position: "absolute",
  top: "0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "100px",
};
const navItemsDesk: SxProps = {
  zIndex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "450px",
  marginRight: "4em",
};

const itemsDesk: SxProps = {
  color: "#F1F1F1",
  cursor: "pointer",
  fontWeight: "bold",
};
const searchBox: SxProps = {
  position: "absolute",
  left: "2em",
  top: "6em",
};

export default Header;
