import { Box, SxProps, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import AOS from "aos";
import { Category } from "../Interfaces";
import { useItems } from "../Contexts/ItemContext";
import { useNavigate } from "react-router-dom";

const CategoryCard = () => {
  const navigate = useNavigate();
  const { categories, fetchCategoriesFromDb, setSelectedCategoryId } =
    useItems();
  const [showMore, setShowMore] = useState(false);

  const slicedCategories = showMore ? categories : categories.slice(0, 4);

  useEffect(() => {
    fetchCategoriesFromDb();
    AOS.init();
    AOS.refresh();
  }, []);

  const test = (id: string) => {
    setSelectedCategoryId(id);
  };
  return (
    <Box sx={categoriesContainer}>
      <Box>
        <Typography sx={secTitle}>Explore our categories</Typography>
      </Box>
      <Box sx={categoriesDiv}>
        {slicedCategories?.map((category: any) => (
          <Box
            sx={categoryDiv}
            key={category.id}
            onClick={() => {
              navigate(`/category/${category.title}`);
              test(category.id);
            }}
            data-aos="fade-left"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            <Box sx={categoryTitleDiv}>
              <Typography sx={categoryTitle}>{category.title}</Typography>
            </Box>
            <Box
              component="img"
              sx={{
                width: { xs: "150px", md: "150px", lg: "200px", xl: "250px" },
                height: { xs: "100px", md: "100px", lg: "150px", xl: "200px" },
                borderRadius: "10px",
              }}
              alt=""
              src={category.img}
            />
          </Box>
        ))}
        <Typography sx={showMoreText} onClick={() => setShowMore(!showMore)}>
          {showMore ? "View Less" : "View more..."}
        </Typography>
      </Box>
      <Box sx={categoriesDivDisk}>
        {categories?.map((category: any) => (
          <Box
            sx={categoryDiv}
            key={category.name}
            onClick={() => {
              navigate(`/category/${category.title}`);
              test(category.id);
            }}
            data-aos="fade-left"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            <Box sx={categoryTitleDiv}>
              <Typography sx={categoryTitle}>{category.title}</Typography>
            </Box>
            <Box
              component="img"
              sx={{
                width: { xs: "150px", md: "150", lg: "200px", xl: "250px" },
                height: { xs: "100px", md: "100px", lg: "150px", xl: "200px" },
                borderRadius: "10px",
              }}
              alt=""
              src={category.img}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
const categoriesContainer: SxProps = {
  marginTop: { xs: 2, md: 15, lg: 15, xl: 15 },
  width: "100%",
  cursor: "pointer",
};
const categoriesDiv: SxProps = {
  display: { xs: "flex", md: "none", lg: "none", xl: "none" },
  width: { xs: "100%", md: "90%", lg: "80%", xl: "80%" },
  minHeight: "250px",
  flexWrap: { xs: "wrap", md: "no-wrap", lg: "no-wrap", xl: "no-wrap" },
  margin: "auto",
  position: "relative",
  userSelect: "none",
};
const categoriesDivDisk: SxProps = {
  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
  width: { xs: "100%", md: "90%", lg: "80%", xl: "80%" },
  minHeight: "400px",
  flexWrap: { xs: "wrap", md: "no-wrap", lg: "no-wrap", xl: "no-wrap" },
  margin: "auto",
  position: "relative",
  userSelect: "none",
};
const categoryDiv: SxProps = {
  width: { xs: "50%", md: "25%", lg: "25%", xl: "25%" },
  position: "relative",
  mt: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const categoryTitleDiv: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: { xs: "150px", md: "150px", lg: "200px", xl: "250px" },
  height: "30px",
  backgroundColor: "rgba(217, 217, 217, .82)",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const categoryTitle: SxProps = {
  fontweight: "900",
  color: "#000000",
  fontSize: { xs: "10px", md: "15px", lg: "15px", xl: "15px" },
};
const secTitle: SxProps = {
  fontSize: { xs: "12px", md: "20px", lg: "20px", xl: "20px" },
  ml: "8%",
  fontWeight: "bold",
  color: "rgba(0, 0, 0, .7)",
};
const showMoreText: SxProps = {
  position: "absolute",
  right: "25px",
  bottom: "-25px",
  fontSize: "12px",
  cursor: "pointer",
};
export default CategoryCard;