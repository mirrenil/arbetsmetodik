import { Box, Button, SxProps, Typography } from '@mui/material'
import React from 'react'
import girlTablet from "../Assets/Images/girlIdea.svg"
import bikeWave from "../Assets/Images/bikeWave.png"
import waves2 from "../Assets/Images/waves2.png"
import waves3 from "../Assets/Images/waves3.png"
import banner from "../Assets/Images/Banner.svg"
import handPhone from "../Assets/Images/handPhone.svg"
import manRolling from "../Assets/Images/Group.svg"
import { Link } from 'react-router-dom'

const HowItWorks = () => {
  return (
    <Box sx={pageHeight}>
      <Box sx={imgAndText}>
      <Box sx={firstTextBox}>
        <Typography sx={text1}>
        How to rent on Chubby Dog?
        </Typography>
        <Typography sx={text2}>
        Access items without owning them by renting them from people in your neighbourhood in a few easy steps.
        </Typography>
      </Box>
      <Box sx={imgGroup}>
      <img src={girlTablet} style={{ height: "25rem", marginTop: "-4rem" }} />
      </Box>
      </Box>
      <img src={bikeWave} style={{ width: "100%", height: "auto" }} />
      <Box sx={imgAndText}>
      <Box sx={secondTextBox}>
        <Typography sx={text1}>
        Sign up and start earning or renting
        </Typography>
        <Typography sx={text2}>
        Create your account
        </Typography>
        <Typography sx={text2}>
        or
        </Typography>
        <Typography sx={text2}>
        Sign in with Gmail
        </Typography>
      </Box>
      <Box sx={bannerDisplay}>
        <img src={banner} style={{ height: "30rem", width: "100%", marginTop: "-10rem"}}/>
      </Box>
      </Box>
      <img src={waves2} alt="" style={{ width: "100%", height: "auto" }} />
      <Box sx={imgAndText}>
      <Box sx={handPhoneDisplay}>
      <img src={handPhone} style={{ width: "100%", height: "100%"}}/>
      </Box>
      <Box sx={thirdTextBox}>
      <Typography sx={text1}>
        List your item
      </Typography>
      <Box sx={text3}>
        <p>
        1. Select your category
        </p>
        <p>
        2. Choose a title
        </p>
        <p>
        3. Write a describtion
        </p>
        <p>
        4. Set a price
        </p>
        <p>
        5. Show your location
        </p>
        <p>
        6. Add an image
        </p>
      </Box>
      </Box>
      </Box>
      <img src={waves3} style={{ width: "100%", height: "auto" }} />
      <Box sx={imgAndText2}>
      <Box sx={fourthTextBox}>
      <Typography sx={text4}>
        Ready to go!
      </Typography>
      <Typography sx={text5}>
        It is that easy!
        <Link to="/signin" style={{ textDecoration: "none" }}>
        <Button sx={btnStyle}>
        Sign up today
        </Button>
        </Link>
      </Typography>
      </Box>
      <Box sx={manRollingDisplay}>
      <img src={manRolling} style={{ marginLeft: "20rem", marginTop: "-10rem"}} />
      </Box>
      </Box>
    </Box>
  )
}

const pageHeight: SxProps = {
  height: "100%"
};
const firstTextBox: SxProps = {
  display: "flex",
  flexDirection: "column",
  textAlign: { xs: "center", md: "none", lg: "none", xl: "none" },
  marginTop: { xs: "5rem", md: "15rem", lg: "15rem", xl: "15rem" },
};
const text1: SxProps = {
  fontSize:"3rem", 
  maxWidth: "20rem", 
  letterSpacing: "1px",
  lineHeight: "4rem"
};
const text2: SxProps = {
  fontSize:"20px", 
  maxWidth: { xs: "20rem", md: "25rem", lg: "25rem", xl: "25rem" }, 
  letterSpacing: "1px", 
  marginTop: "1rem"
};
const text3: SxProps = {
  display: "flex",
  flexDirection: "column",
  fontSize:"20px", 
  maxWidth: { xs: "none", md: "25rem", lg: "25rem", xl: "25rem" }, 
  letterSpacing: "1px", 
  marginTop: "10px"
};
const text4: SxProps = {
  fontSize:{ xs: "3rem", md: "5rem", lg: "5rem", xl: "5rem" }, 
  width: "20rem", 
  letterSpacing: "1px"
};
const text5: SxProps = {
  fontSize:"2rem", 
  width: "20rem", 
  letterSpacing: "1px",
  marginTop: "2rem"
};
const imgGroup: SxProps = {
  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
  marginLeft: { xs: "none", md: "10rem", lg: "20rem", xl: "20rem" }, 
  marginTop: { xs: "none", md: "12rem", }
};
const secondTextBox: SxProps = {
  display: "flex",
  flexDirection: "column",
  textAlign: { xs: "center", md: "none", lg: "none", xl: "none" },
};
const thirdTextBox: SxProps = {
  display: "flex",
  flexDirection: "column",
  textAlign: { xs: "center", md: "none", lg: "none", xl: "none" },
  marginLeft: { xs: "none", md: "10rem", lg: "20rem", xl: "20rem" }, 
  marginTop: { xs: "3rem", md: "none", lg: "none", xl: "none" }
};
const imgAndText: SxProps = {
  display: "flex", 
  flexDirection: "row", 
  justifyContent: "center"
};
const imgAndText2: SxProps = {
  display: "flex", 
  flexDirection: "row", 
  justifyContent: "center",
  marginTop: { xs: "3rem", md: "none", lg: "none", xl: "none" }
};
const fourthTextBox: SxProps = {
  display: "flex",
  flexDirection: "column",
  textAlign: { xs: "center", md: "none", lg: "none", xl: "none" },
  marginTop: { xs: "-5rem", md: "-10rem", lg: "-10rem", xl: "-10rem" }
};
const btnStyle: SxProps = {
  marginTop: "2rem",
  backgroundColor: "#FEBF00",
  color: "#fff",
  '&:hover': {
    backgroundColor: '#F4B800',
    color: '#fff',
},
};
const bannerDisplay: SxProps = {
  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" }
};
const handPhoneDisplay: SxProps = {
  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" }
};
const manRollingDisplay: SxProps = {
  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" }
};

export default HowItWorks