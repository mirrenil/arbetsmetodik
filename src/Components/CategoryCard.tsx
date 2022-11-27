import { Box, SxProps, Typography } from '@mui/material';
import { getDocs, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

const CategoryCard = (categories: any[], setCategoriesId: any) => {
  const [showMore, setShowMore] = useState(false);
  
  const dataForDisplay = showMore ? categories[0] : categories[0].slice(0, 4)
  
  console.log('categories',typeof categories );


  return (
    <Box sx={categoriesContainer}>
            <Box>
              <Typography sx={secTitle}>Explore our categories</Typography>
            </Box>
            <Box sx={categoriesDiv}>
              {dataForDisplay?.map((category: any) =>
                <Box sx={categoryDiv} key={category.id} onClick={() => 
                  setCategoriesId(category.id)
                }>
                    <Box sx={categoryTitleDiv}>
                        <Typography sx={categoryTitle}>{category.title}</Typography>
                    </Box>
                  <img src={category.img} alt="" style={{width: '130px', height: '100px', borderRadius: '10px'}}/>
                </Box>
              )}
               <Typography sx={showMoreText}  onClick={() => setShowMore(!showMore)}>
                          {showMore ? 'View Less' : 'View more...'} 
                </Typography>
            </Box>
        </Box>
  )
}
const categoriesContainer: SxProps = {
  mt: {xs: 2,md: 5,  lg:15, xl:15},
  width: '100%',
  cursor: 'pointer',
}
const categoriesDiv: SxProps = {
  display: 'flex',
  width: {xs: '100%',md: '90%',  lg: '80%', xl: '80%'},
  minHeight: '250px',
  flexWrap: {xs: 'wrap', md:'no-wrap', lg: 'no-wrap', xl: 'no-wrap' },
  margin: 'auto',
  position: 'relative',
  userSelect: 'none',
}
const categoryDiv: SxProps = {
  width: {xs: '50%', md:'25%', lg: '25%', xl: '25%' },
  position: 'relative',
  mt: 1, 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const categoryTitleDiv: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '130px',
  height: '30px',
  backgroundColor: 'rgba(217, 217, 217, .82)',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
const categoryTitle: SxProps = {
  fontweight: '900',
  color: '#000000',
  fontSize: '10px'
}
const secTitle: SxProps = {
  fontSize: '12px', 
  ml: '8%',
  fontWeight: 'bold', 
  color:'rgba(0, 0, 0, .7)',
}
const showMoreText: SxProps = {
  position: 'absolute',
  right: '25px',
  bottom: '-15px',
  fontSize: '12px',
  cursor: 'pointer',
}
export default CategoryCard