import { Box, SxProps } from '@mui/material'
import React from 'react'
import footerImg from '../Assets/Images/footer.png'
import footer2Img from '../Assets/Images/footer2.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { fontSize } from '@mui/system';

const Footer = () => {
  return (
    <Box sx={navBox}>
        <Box sx={imgAlign}>
          <img src={footerImg} alt="" style={{width: '100%', height: '150px' }} />
          </Box>
       <Box sx={align1}>
      <Box sx={align}>
      <Box sx={textalign}>
        About Chubby Dog
      </Box>
      <Box sx={textalign}>
        How it works
      </Box>
      <Box sx={textalign}>
        Terms and conditions 
      </Box>
      </Box>
      <Box sx={iconAlign}>
        <TwitterIcon />
        <InstagramIcon />
        <FacebookIcon />
      </Box>
      </Box> 

      <Box sx={test}>
      <Box sx={desktopAlign}>
          <img src={footer2Img} alt="" style={{width: '100%', height: 'auto' }} />
          </Box>
      <Box sx={align2}>
      <Box sx={textAlign}>
        About Chubby Dog
      </Box>
      <Box sx={textAlign}>
        How it works
      </Box>
      <Box sx={textAlign}>
        Terms and conditions
      </Box>

      </Box>

      <Box sx={iconAlignDesktop}>
        <TwitterIcon sx={iconStyle} />
        <InstagramIcon sx={iconStyle}/>
        <FacebookIcon sx={iconStyle}/>
      </Box>


      </Box>





      </Box>

      
      
  )
}

const navBox: SxProps = {
}
const test: SxProps = {
  position: 'relative',
  display: { xs: 'none', md:'flex', lg: 'flex', xl: 'flex' },
  
}
const textAlign: SxProps = {
  marginBottom: '30px'
}
const align1: SxProps = {
  display: { xs: 'flex', md:'none', lg: 'none', xl: 'none' },
  flexDirection: 'column',
  paddingBottom: '20px',
}
const align2: SxProps = {
  display: { xs: 'none', md:'flex', lg: 'flex', xl: 'flex' },
  flexDirection: 'column',
  position: 'absolute',
  bottom: { xs: 'none', md:'0', lg: '10px', xl: '30px' },
  left: '60px',
  fontSize: { xs: 'none', md:'20px', lg: '30px', xl: '30px' },
  boxSizing: 'border-box'
}
const align: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '10px',
  marginLeft: '50px',
  

  
}
const imgAlign: SxProps = {
  display: { xs: 'flex', md:'none', lg: 'none', xl: 'none' },
  
}
const desktopAlign: SxProps = {
  display: { xs: 'none', md:'flex', lg: 'flex', xl: 'flex' },
  
}
const iconAlign: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '10px',
  marginTop: '10px'
}
const iconAlignDesktop: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  position: 'absolute',
  bottom: '30px',
  right: { xs: 'none', md:'200px', lg: '200px', xl: '300px' },
}
const iconStyle: SxProps = {
  fontSize: { xs: 'none', md:'60px', lg: '70px', xl: '70px' },
}
const textalign: SxProps = {
  
}
export default Footer