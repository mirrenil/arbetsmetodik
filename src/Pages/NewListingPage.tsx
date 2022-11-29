import React, { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

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

export default function NewListing() {
  const [category, setCategory] = useState("Select Category");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const listingsRef = collection(db, "listings");
  const navigate = useNavigate();

  const handleNewListing = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(listingsRef, {
        category,
        title,
        description,
        price,
        image,
        createdAt: Timestamp.now(),
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Box
      sx={{
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
        onSubmit={handleNewListing}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
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
          type="number"
          id="outlined-basic"
          label="Price per day"
          variant="outlined"
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          sx={{ marginBottom: "1rem" }}
          id="outlined-basic"
          label="Image url"
          variant="outlined"
          onChange={(e) => setImage(e.target.value)}
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
            By adding this listing you agree with Chubby Dog&apos;s terms of use
          </h5>
        </Box>
        <Button
          sx={{ background: "#00C4BA" }}
          type="submit"
          variant="contained"
          size="large"
        >
          Create listing
        </Button>
      </Box>
    </Box>
  );
}
