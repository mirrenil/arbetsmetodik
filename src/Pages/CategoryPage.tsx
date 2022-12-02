import { Box, SxProps, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ItemCard from "../Components/ItemCard";
import { useItems } from "../Contexts/ItemContext";
import { ListItem } from "../Interfaces";

function CategoryPage() {
  const { name } = useParams();
  const { items, categories, fetchCategoriesFromDb, fetchItemsFromDb } =
    useItems();

  useEffect(() => {
    fetchCategoriesFromDb();
    fetchItemsFromDb();
  }, []);
  const chosenCategory = categories.find((c) => c.title === name);
  const chosenCategoryImg: any = chosenCategory?.img;
  const CategoryItems = items.filter(
    (item) => item.category === chosenCategory?.title
  );

  return (
    <Box sx={wrapper}>
      <Box sx={categoryContainer}>
        <Box sx={categoryDiv} key={chosenCategory?.id}>
          <Box
            component="img"
            sx={categoryImg}
            alt={chosenCategory?.title}
            src={chosenCategoryImg}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={mainTitle}>
            {" "}
            Category / {chosenCategory?.title}{" "}
          </Typography>
        </Box>
        <Box sx={itemsContainer}>
          {CategoryItems?.map((item: ListItem) => (
            <Link
              to={`/items/${item.id}`}
              key={item.id}
              style={{ textDecoration: "none" }}
            >
              <ItemCard item={item} />
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const wrapper: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: { xs: 0, md: "100px", lg: "100px", xl: "100px" },
  minHeight: 1000,
};
const mainTitle: SxProps = {
  marginLeft: 3,
  fontSize: { xs: "20px", md: "30px", lg: "40px", xl: "40px" },
};
const categoryContainer: SxProps = {
  width: { xs: "100%", md: "90%", lg: "90%", xl: "90%" },
  position: "relative",
  mt: 1,
};
const categoryDiv: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const categoryImg: SxProps = {
  width: { xs: "150px", md: "200px", lg: "350px", xl: "350px" },
  height: { xs: "100px", md: "150px", lg: "250px", xl: "250px" },
  borderRadius: "10px",
};

const itemsContainer: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "95%",
  flexWrap: "wrap",
  mt: 10,
  ml: 2,
};
export default CategoryPage;
