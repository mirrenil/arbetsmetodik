import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, TextField} from '@mui/material';

const categories = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Electronics',
    label: 'Electronics',
  },
  {
    value: 'Home',
    label: 'Home',
  },
  {
    value: 'Clothing',
    label: 'Clothing',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

const locations = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Stockholm',
    label: 'Stockholm',
  },
  {
    value: 'Gothenburg',
    label: 'Gothenburg',
  },
  {
    value: 'Malmö',
    label: 'Malmö',
  },
];

function NewListing() {
  const [category, setCategory] = useState('Select Category');
  const [location, setLocation] = useState('Select Location');
  const uploadImageRef = useRef<HTMLInputElement | null>(null);
  
  const onUpload = () => {
    uploadImageRef.current?.click();
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <h1>Create a listing</h1>
<Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
          id="outlined-select-category-native"
          select
          label="Select a category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      <TextField id="outlined-basic" label="Title" variant="outlined" />
      <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          label="Description"
        />
        <TextField
          id="outlined-select-category-native"
          select
          label="Select your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          {locations.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField id="outlined-basic" label="Price per day" variant="outlined" />
        
        {/* FANCIER DATE PICKER HERE IF WE HAVE TIME */}
        
         <input type="datetime-local" name="date" id="date" />
        <input
        ref={uploadImageRef}
        type="file"
        accept='image/*'
        onChange={onUpload} />
        <div style={{backgroundColor: "#80CCFF", width: "70vw", height: "3.5rem", borderRadius: "6px", opacity: "70%"}}>
          <h5>By adding this listing you agree with Chubby Dog's terms of use</h5>
      
        </div>
        <Button variant="contained">Create listing</Button>
    </Box>
    </div>
  );
}

export default NewListing;
