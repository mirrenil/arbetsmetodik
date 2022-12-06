import { Box, SxProps, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { IListItem } from "../Interfaces";
import { useItems } from "../Contexts/ItemContext";
import ItemCard from "../Components/ItemCard";
import { Link } from "react-router-dom";

const FreeRentCategory = () => {
  const { fetchItemsFromDb, items } = useItems();
  useEffect(() => {
    fetchItemsFromDb();
  }, []);
  return (
    <Box sx={wrapper}>
      <Box sx={categoryDiv}>
        <Box
          component="img"
          sx={categoryImg}
          alt="free Price Image"
          src={"https://quantlabs.net/blog/wp-content/uploads/2021/08/free.jpg"}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={mainTitle}> Category / Free to rent</Typography>
      </Box>
      <Box>
        <Box sx={itemsContainer}>
          {items
            .filter((item) => item.price === 0)
            .map((item: IListItem) => (
              <Link
                to={`/items/${item.id}`}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <ItemCard key={item.id} item={item} />
              </Link>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
const wrapper: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: { xs: 0, md: "100px", lg: "100px", xl: "100px" },
  minHeight: 700,
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
const mainTitle: SxProps = {
  marginLeft: 3,
  fontSize: { xs: "20px", md: "30px", lg: "40px", xl: "40px" },
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
export default FreeRentCategory;
