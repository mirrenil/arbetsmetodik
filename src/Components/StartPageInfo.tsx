import { Box, Button, SxProps, Typography } from '@mui/material'
import AOS from "aos";
import { useEffect } from 'react';

import startPageInfoImg from '../Assets/Images/startPageInfoImg.png'
import infoSecImg from '../Assets/Images/infoSecImg.png'

const StartPageInfo = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Box 
    sx={mainPageInfoBox}
     >
      <Box sx={imgBox}>
          <Box
            component="img"
            sx={{
              width:{ xs: 'none', md:'100%', lg: '100%', xl: '100%' }, 
              height: '100%', 
            }}
            alt=""
            src={startPageInfoImg}
          />
      </Box>
      <Box 
      sx={infoMainTextBox}
      data-aos="fade-right"
      data-aos-offset="200"
      data-aos-duration="500"
      >
        <Box >
          <Typography sx={{fontSize: { xs: 'none', md:'30px', lg: '50px', xl: '50px' }}}>Share your stuff, earn cash</Typography>
          <Box sx={infoMainParagraph}>
          <Typography sx={{fontSize: { xs: 'none', md:'12px', lg: '16px', xl: '16px' }}}>
            Borrow almost anything from people nearby for jobs at home, fun experiences or work., Borrow almost anything from people nearby for jobs at home, fun experiences or work.,Borrow almost anything from people nearby for jobs at home, fun experiences or work.,Borrow almost anything from people nearby for jobs at home, fun experiences or work.
          </Typography>
          </Box>
        </Box>
        <Box sx={buttonBox}>
          <Button
            sx={{
              backgroundColor: '#00C4BA',
              color: '#FFFFFF',
            }}
          >
            Create a listing
          </Button>
        </Box>
      </Box>
     
      <Box sx={infoSecTextBox}>
        <Box sx={infoSecText}>
          <Box
            data-aos="fade-right"
            data-aos-offset="200"
            data-aos-duration="500"
          >
            <Box
              component="img"
              sx={{
                width:{ xs: 'none', md:'400px', lg: '500px', xl: '100%' }, 
                height: '100%', 
              }}
              alt=""
              src={infoSecImg}
            />
          </Box>
          <Box 
          sx={shareTextBox}
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-duration="500"
          >
              <Typography sx={{fontSize: { xs: 'none', md:'30px', lg: '50px', xl: '50px' }}}>We have everything for <br /> you</Typography>
            <Box sx={infoSecParagraph}>
              <Typography sx={{fontSize: { xs: 'none', md:'14px', lg: '16px', xl: '16px' }}}>
                Borrow almost anything from people nearby for jobs at home, fun experiences or work., Borrow almost anything from people nearby for jobs at home, fun experiences or work.,Borrow almost anything from people nearby for jobs at home, fun experiences or work.,Borrow almost anything from people nearby for jobs at home, fun experiences or work.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      </Box>
  )
}
const mainPageInfoBox: SxProps = {
  display: { xs: 'none', md:'block', lg: 'block', xl: 'block' },
  // height: { xs: 'none', md:'1200px', lg: '1900px', xl: '1900px'},
  mt: 10,
  position: 'relative'
}
const infoMainTextBox: SxProps = {
  width: { xs: 'none', md:'500px', lg: '600px', xl: '640px' },
  position: 'absolute',
  left: { xs: 'none', md:30, lg: 50, xl: 50},
  top: { xs: 'none', md:0, lg: 50, xl: 150 },
}
const infoSecTextBox: SxProps = {
  width: '90%',
  position: 'relative',
  margin: 'auto',
}
const shareTextBox: SxProps = {
  position: 'absolute',
  top: 0,
  right:{ xs: 'none', md:0 , lg: '5%', xl: '5%'},
  width:{ xs: 'none', md:'400px', lg: '550px', xl: '550px'},
}

const infoMainParagraph: SxProps = {
  width: { xs: 'none', md:300, lg: 400, xl: 400},
  margin:  { xs: 'none', md: 1, lg: 'auto', xl: 'auto'},
 
}
const infoSecParagraph: SxProps = {
  margin: 'auto',
  height: '200px',
}
const infoSecText: SxProps = {
  width:{ xs: 'none', md: '100%', lg:'90%', xl:'90%'},
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}
const buttonBox: SxProps = {
 width: '100%',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center'
}
const imgBox: SxProps = {
 position: 'relative',
 top: '0',
 left: '0',
 width: '100%',
}

export default StartPageInfo