/* eslint-disable */
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
import { useNavigate } from "react-router-dom";
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
              <form
                onSubmit={formik.handleSubmit}
                style={{ width: "95%", maxWidth: "400px" }}
              >
                <h1 style={{ textAlign: "center" }}>Create a listing</h1>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "2rem",
                  }}
                >
                  <FormControl sx={textfieldStyle}>
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
                    sx={textfieldStyle}
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                  <TextField
                    sx={textfieldStyle}
                    multiline
                    rows={3}
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
                    sx={textfieldStyle}
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
                    sx={textfieldStyle}
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
                    sx={textfieldStyle}
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
                    sx={{ width: "12rem", color: "white" }}
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
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "white",
                }}
                variant="contained"
                onClick={() => navigate("/profile/:id")}
              >
                Update profile
              </Button>
            </>
          )}
        </>
      ) : (
        <Box sx={notSignedIn}>
          <Typography variant="h5">
            You need to be signed in to create a listing!
          </Typography>
          <Box sx={buttonBox}>
            <Button
              color="primary"
              variant="contained"
              sx={signButton}
              onClick={() => navigate("/signin")}
            >
              Sign in
            </Button>
            <Typography variant="subtitle2">
              Dont have an account yet?
            </Typography>
            <Button
              color="primary"
              variant="contained"
              sx={signButton}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
const wrapper: SxProps = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  zIndex: "100",
  marginTop: { xs: "100px", md: "200px", lg: "100px", xl: "100px" },
};
const textfieldStyle: SxProps = {
  marginBottom: "1rem",
  boxSizing: "border-box",
  width: "100%",
};

const notSignedIn: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  height: "300px",
};

const buttonBox: SxProps = {
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3rem",
  height: "50%",
};

const signButton: SxProps = {
  width: "200px",
  color: "white",
  background: "#00C4BA",
};
