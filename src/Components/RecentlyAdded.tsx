import { Box, SxProps, Typography } from '@mui/material';
import { getDocs, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import AOS from "aos";
import "aos/dist/aos.css";

const RecentlyAdded = () => {
  const [items, setItems] = useState<any>([]);
 
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      let dataWithId: any[] = []
      const querySnapshot = await getDocs(collection(db, "listings"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let data = doc.data()
        data['id'] = doc.id
        // doc.data() is never undefined for query doc snapshots
        dataWithId.push(data)
        setItems(dataWithId)
      });
    }
    fetchItems()
  }, [])
  console.log('items', items);
  return (
    <div>
      
      <Box sx={MainItemsContainer}>
              <Typography sx={secTitle}>Recently added items</Typography>
              <Box sx={itemsContainer}>
              {items.map((item: any) =>
                <Box 
                sx={itemDiv} 
                key={item.id}
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-duration="1000"
                data-aos-delay= '100'
                >
                  <Box sx={imgBox}>
                    <img src={item.image} alt={item.title} style={{width: '100px', height: '90px', borderRadius: '10px', }} />
                  </Box>
                      <Box sx={infoBox}>
                        <Typography>  {item.title}</Typography>
                        <Typography>{item.price + '/day'}</Typography>
                      </Box>   
                </Box>
              )}

              </Box>
            </Box>
    </div>
  )
}
const MainItemsContainer: SxProps = {
  width: '100%',
  mt: 8,
}
const itemsContainer: SxProps = {
  display: 'flex',
  width: {xs: '100%',md: '90%',  lg: '80%', xl: '80%'},
  minHeight: '250px',
  flexWrap: {xs: 'wrap', md:'no-wrap', lg: 'no-wrap', xl: 'no-wrap' },
  margin: 'auto',
  position: 'relative',
  userSelect: 'none',
}
const itemDiv: SxProps = {
  width: {xs: '40%', md:'150px', lg: '150px', xl: '150px' },
  height: '150px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 5,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  mb: 2,
}
const imgBox: SxProps = {
 height: '140px',
 mb: 3,
 mt: 1,
 width: '150px',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
}
const infoBox: SxProps = {
  display: 'flex',
  // alignItems: 'center',
  justifyContent: 'space-between',
  width: '90%',
  margin: 'auto',
  paddingBottom: 1,
}
const secTitle: SxProps = {
  fontSize: {xs: '12px',md: '20px',  lg: '20px', xl: '20px'}, 
  ml: '7%',
  mb: 1,
  fontWeight: 'bold', 
  color:'rgba(0, 0, 0, .7)',
}
export default RecentlyAdded