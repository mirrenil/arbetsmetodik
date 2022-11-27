import { Box, SxProps } from '@mui/material';
import { Avatar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GavelIcon from '@mui/icons-material/Gavel';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import backGroundImg from '../Assets/Images/DiskTopHeaderBackground.png'
import logoImg from '../Assets/Images/logo.png'



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
 
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  
  return (
    <Box sx={navBox}>
      <Box sx={navBoxInnerMobile}>
      <Box sx={logo}>
        <Link to='/'>
        <Avatar alt="Logo" src={logoImg} sx={logoImgStyle}/>
        </Link>
      </Box>
      <Box>
        <Box sx={naveItems}>
        <Link to='/newlisting' style={{textDecoration: 'none'}}>
          <AddCircleOutlineIcon sx={{cursor: 'pointer', width: '30px', height: '30px', fill: '#000'}} />
        </Link>
        <Link to='/profile/:id' style={{textDecoration: 'none'}}>
          <AccountCircleIcon sx={{cursor: 'pointer', width: '30px', height: '30px', fill: '#000'}}  />          
        </Link>
          <MenuIcon
            onClick={() => menuOpen ? setMenuOpen(false) : setMenuOpen(true)}
            sx={{cursor: 'pointer', width: '30px', height: '30px', fill: '#000'}}
          />
          {menuOpen ? 
            <Box 
            sx={mobileMenuList}
            data-aos="fade-left"
            data-aos-offset="200"
            data-aos-duration="1000"
            >
              <ul 
              style={{listStyle: 'none', marginTop: '4em'}}
              data-aos="fade-left"
              data-aos-offset="200"
              data-aos-duration="1000"
              >
                <Link to='/' style={{textDecoration: 'none'}}>
                  <Box sx={naveItem}>
                    <AddCircleOutlineIcon sx={navMenuIcon}/><Typography sx={naveItemText}>List an Item</Typography>
                  </Box>
                </Link>
                <Link to='/' style={{textDecoration: 'none'}}>
                  <Box sx={naveItem}>
                    <LoginIcon sx={navMenuIcon}/><Typography sx={naveItemText}>Login</Typography>
                  </Box>
                </Link>
                <Link to='/' style={{textDecoration: 'none'}}>
                  <Box sx={naveItem}>
                   <SensorOccupiedIcon sx={navMenuIcon}/><Typography sx={naveItemText}>Sign Up</Typography>
                  </Box>
                 </Link>
                 <Link to='/' style={{textDecoration: 'none'}}>
                  <Box sx={naveItem}>
                    <HelpOutlineIcon sx={navMenuIcon} /><Typography sx={naveItemText}>How it works?</Typography>
                  </Box>
                 </Link>
                 <Link to='/' style={{textDecoration: 'none'}}>
                  <Box sx={naveItem}>
                  <GavelIcon sx={navMenuIcon} /><Typography sx={naveItemText}>Terms of use</Typography>
                  </Box>
                 </Link>
                  <Link to='/' style={{textDecoration: 'none'}}>
                  <Box sx={naveItem}>
                  <ContactPhoneIcon sx={navMenuIcon} /><Typography sx={naveItemText}>Contact</Typography>
                  </Box>
                 </Link>
                   <Box sx={naveItem}>
                   <MeetingRoomIcon sx={navMenuIcon} /><Typography sx={naveItemText}>Log Out</Typography>
                  </Box>
              
              </ul>
            </Box>  
            : null 
        }
        </Box> 
      </Box>
      </Box>
      <Box sx={navBoxDisk}>
        <Box >
          <img src={backGroundImg} alt="" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '400px'}} />
        </Box>
        <Box sx={navBoxInnerDisk}>
          <Link to='/' style={{textDecoration: 'none'}}>
          <Typography 
          sx={{color: '#f1f1f1', fontSize: '50px', fontWeight: 'bold', ml:'10px',  cursor: 'pointer'}}
          >
            Chubby Dog
          </Typography>
          </Link>
          <Box sx={navItemsDisk}>
          <Link to='/howItWorks' style={{textDecoration: 'none'}}>
            <Typography sx={itemsDisk}>How it works</Typography>
          </Link>
          <Link to='/' style={{textDecoration: 'none'}}>
            <Typography sx={itemsDisk}>List an item</Typography>
          </Link>
          <Link to='/signin' style={{textDecoration: 'none'}}>
            <Typography sx={itemsDisk}>LogIn/SingUp</Typography>
          </Link>
          </Box>
        </Box>
        <Box sx={searchBox}>
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, height: 25 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '12px' }}
              placeholder="What are you looking for?"
              inputProps={{ 'aria-label': 'What are you looking for?' }}
            />
            <IconButton type="button" 
            sx={{ p: '10px', backgroundColor: '#00C4BA', height: '23px', width: '30px', borderRadius: '5px' }} 
            aria-label="search"
            >
              <SearchIcon />
            </IconButton>
        </Paper>
        </Box>
        <Box sx={mainLogoDiv}>
        <Box sx={diskMainLogo}>
          <Avatar alt="Logo" src={logoImg} sx={mainLogo}/>
            <Typography sx={mainDiskText}>Lorem impsum dolor sit amet bla </Typography>
          <Typography sx={diskText}>Borrow almost anything from people nearby for jobs at home, fun experiences or work.</Typography>
          </Box>
        </Box>
      </Box>
     
    </Box>
  )
}
 
const navBox: SxProps = {
  height: { xs: '100px', md: '550px', lg: '550px', xl: '550px' },
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  zIndex: '3',
}
const navBoxInnerMobile: SxProps = {
  width: '100%',
  display: { xs: 'flex', md:'none', lg: 'none', xl: 'none' },
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: '3',
  backgroundColor: '#ffffff'

}
const naveItems: SxProps = {
  width: '150px',
  alignItems: 'center',
  justifyContent: 'space-between',
  mr: '1em',
  display: { xs: 'flex', md:'none', lg: 'none', xl: 'none' },
}
const logo: SxProps = {
  width: '100px',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const logoImgStyle: SxProps = {
 
}
const mobileMenuList: SxProps = {
  width: '250px',
  height: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  position: 'absolute',
  right: '0',
  top: '100px',
  borderLeft: '1px solid black',
  backgroundColor: '#ffffff'
}
const naveItem: SxProps = {
 marginTop: '1em',
 cursor: 'pointer',
 display: 'flex',
 alignItems: 'center',
 justifyContent: '',
 width: '200px',
}
const naveItemText: SxProps = {
  fontWeight:"bold",
  color: '#000',
  marginLeft: '1em',
}
const navMenuIcon: SxProps = {
  color: '#000',
}

const navBoxDisk: SxProps = {
  display: { xs: 'none', md:'flex', lg: 'flex', xl: 'flex' },
  width: '100%',
  height: '100px',
  alignItems: 'center',
  justifyContent: 'center',
}
const navBoxInnerDisk: SxProps = {
  zIndex: '1',
  position: 'absolute',
  top: '0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '100px',
}
const navItemsDisk: SxProps = {
  zIndex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '450px',
  marginRight: '4em',
}
const itemsDisk: SxProps = {
  color: '#F1F1F1',
  cursor: 'pointer',
  fontWeight: 'bold',
}
const searchBox: SxProps = {
  position: 'absolute',
  left: '2em',
  top: '6em',
}


const mainLogoDiv: SxProps = {
  // width: '100%',
  display: { xs: 'none', md:'flex', lg: 'flex', xl: 'flex' },
  position: 'absolute',
  top: '200px',
  left: '50%',
  textAlign: 'center',
}
const diskMainLogo: SxProps = {
 
}
const mainLogo: SxProps = {
   width: '200px',
   height: '200px',
   transform: 'translateX(-50%)',

}
const mainDiskText: SxProps = {
    color: 'black',
    transform: 'translateX(-50%)',
    marginTop: '1em',
    fontSize: '1.5em',
    fontweight: 'bold'
}
const diskText: SxProps = {
    color: 'black',
    transform: 'translateX(-50%)',
}


export default Header;