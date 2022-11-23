import React, { FormEvent, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Button, FormGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { display } from "@mui/system";
//import { useAuth } from '../contexts/AuthContext';

const categories = [
  {
    value: "Select a category",
    label: "Select a category",
  },
  {
    value: "Electronics",
    label: "Electronics",
  },
  {
    value: "Home",
    label: "Home",
  },
  {
    value: "Clothing",
    label: "Clothing",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const locations = [
  {
    value: "Select your location",
    label: "Select your location",
  },
  {
    value: "Stockholm",
    label: "Stockholm",
  },
  {
    value: "Gothenburg",
    label: "Gothenburg",
  },
  {
    value: "Malmö",
    label: "Malmö",
  },
];

function NewListing() {
  /* const { currentUser } = useAuth() */
  const [category, setCategory] = useState("Select Category");
  const [location, setLocation] = useState("Select Location");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [availability, setAvailability] = useState("");
  const listingsRef = collection(db, "listings");
  const navigate = useNavigate();

  // type any for now
  const handleNewListing = async (event: FormEvent) => {
    event.preventDefault();
    console.log("hello test");
    await addDoc(listingsRef, {
      category,
      title,
      description,
      price,
      location,
      createdAt: Timestamp.now().toDate(),
    });
    console.log("New listing added");
    navigate("/");
  };

  const handleImage = () => {
    // TODO: add image upload
    // const multipleImages = [];
    // for (let i = 0; i < e.target.files.length; i++) {
    //   multipleImages.push(e.target.files[i]);
    // }
    // multipleImages.push(e.target.files);
    // setImage(multipleImages);
  };

  const uploadpload = async (image: string[]) => {
    console.log(image);
    // prepare for upload
    // await image.forEach((image) => {
    //   const imageRef = ref(storage, `images/${image.name}`);
    //   uploadBytes(imageRef, image).then(() => {
    //     console.log('Upload successful');
    //   });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        margin: "auto",
      }}
    >
      <h1>Create a listing</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <FormGroup onSubmit={handleNewListing}>
          <TextField
            sx={{ marginBottom: "1rem" }}
            id="outlined-select-category-native"
            select
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
          <TextField
            sx={{ marginBottom: "1rem" }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: "1rem" }}
            id="outlined-multiline-static"
            multiline
            rows={4}
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: "1rem" }}
            id="outlined-select-category-native"
            select
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
          <TextField
            sx={{ marginBottom: "1rem" }}
            id="outlined-basic"
            label="Price per day"
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* FANCIER DATE PICKER HERE IF WE HAVE TIME */}
          <TextField
            sx={{ marginBottom: "1rem" }}
            type="date"
            id="outlined-basic"
            variant="outlined"
            defaultValue="2022-12-01"
            onChange={(e) => setAvailability(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: "1rem" }}
            type="file"
            id="outlined-basic"
            onChange={() => handleImage()}
          />

          <Box
            sx={{
              backgroundColor: "#80CCFF",
              borderRadius: "6px",
              opacity: "60%",
              marginBottom: "1rem",
            }}
          >
            <h5 style={{ margin: "1rem" }}>
              By adding this listing you agree with Chubby Dog's terms of use
            </h5>
          </Box>
          <Button type="submit" variant="contained" size="large">
            Create listing
          </Button>
        </FormGroup>
      </Box>
    </div>
  );
}

export default NewListing;
