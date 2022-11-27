import { Box, SxProps, Typography } from '@mui/material';
import { getDocs, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

const RecentlyAdded = () => {
  const [items, setItems] = useState<any>([]);
 

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
                <Box sx={itemDiv} key={item.id}>
                    {item.title} <br />
                    {item.price + '/day'}
                    <img src={item.image} alt="" />
                </Box>
              )}

              </Box>
            </Box>
    </div>
  )
}
const MainItemsContainer: SxProps = {
  // float: 'right',
  width: '100%',
}
const itemsContainer: SxProps = {
  // float: 'right',
  width: '100%',
  display: 'flex',
}
const itemDiv: SxProps = {
  // float: 'right',
  width: '90%',
  margin: 'auto',
  display: 'flex',
}
const secTitle: SxProps = {
  fontSize: '12px', 
  ml: '8%',
  fontWeight: 'bold', 
  color:'rgba(0, 0, 0, .7)',
}
export default RecentlyAdded