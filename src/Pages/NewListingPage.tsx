import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContext";
import * as yup from "yup";
import { useFormik } from "formik";
 
const validationSchema = yup.object({
  category: yup.string().required("Category is required"),
  title: yup.string().required("Please choose a title"),
  price: yup.number().required("Please set a price in numbers"),
  description: yup.string().required("Please provide a description"),
  location: yup
    .string()
    .required("Please provide a district in Gothenburg (ex. Hisingen)"),
  imageUrl: yup
    .string()
    .min(8, "The Image URL should be of minimum 8 characters length")
    .required("Example: https://minhast.se/uploads/GettyImages.jpg"),
});
 
const categories = [
  {
    value: "Electronics",
    title: "Electronics",
  },
  {
    value: "Film & Photography",
    title: "Film & Photography",
  },
  {
    value: "Home",
    title: "Home",
  },
  {
    value: "Clothing",
    title: "Clothing",
  },
  {
    value: "Tools",
    title: "Tools",
  },
  {
    value: "Gaming",
    title: "Gaming",
  },
  {
    value: "Cars",
    title: "Cars",
  },
  {
    value: "Other",
    title: "Other",
  },
];
 
export default function NewListing() {
  const { currentUser } = useAuth();
  const [authorID, setAuthorID] = useState(currentUser?.uid);
  const listingsRef = collection(db, "listings");
  const navigate = useNavigate();
 
  const handleNewListing = async () => {
    try {
      const docRef = await addDoc(listingsRef, {
        category: formik.values.category,
        title: formik.values.title,
        description: formik.values.description,
        price: formik.values.price,
        location: formik.values.location,
        image: formik.values.imageUrl,
        authorID,
        createdAt: Timestamp.now(),
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
 
  const formik = useFormik({
    initialValues: {
      category: "",
      title: "",
      price: "",
      description: "",
      location: "",
      imageUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleNewListing();
    },
  });
 
  return (
    <Box sx={wrapper}>
      {currentUser ? (
        <>
          {currentUser.displayName ? (
            <>
              <form onSubmit={formik.handleSubmit}>
                <h1>Create a listing</h1>
                <Box
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FormControl sx={{ marginBottom: "1rem" }}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      name="category"
                      value={formik.values.category}
                      label="categoryLabel"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.category &&
                        Boolean(formik.errors.category)
                      }
                    >
                      {categories.map((chooseCategory, index) => (
                        <MenuItem key={index} value={chooseCategory.title}>
                          {chooseCategory.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    sx={{ marginBottom: "1rem" }}
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                  <TextField
                    sx={{ marginBottom: "1rem" }}
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                  <TextField
                    sx={{ marginBottom: "1rem" }}
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                  <TextField
                    sx={{ marginBottom: "1rem" }}
                    id="location"
                    name="location"
                    label="Location"
                    type="text"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.location && Boolean(formik.errors.location)
                    }
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                  />
                  <TextField
                    sx={{ marginBottom: "1rem" }}
                    id="imageUrl"
                    name="imageUrl"
                    label="Image Url"
                    type="text"
                    value={formik.values.imageUrl}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.imageUrl && Boolean(formik.errors.imageUrl)
                    }
                    helperText={
                      formik.touched.imageUrl && formik.errors.imageUrl
                    }
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Please update your profile with a username before creating a
                listing
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/profile/:id")}
              >
                Update profile
              </Button>
            </>
          )}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            You need to be signed in to create a listing
          </Typography>
          <Button onClick={() => navigate("/signin")}></Button>
        </Box>
      )}
    </Box>
  );
}
const wrapper: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  marginTop: { xs: "100px", md: "250px", lg: "150px", xl: "150px" },
};