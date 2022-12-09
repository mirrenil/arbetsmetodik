import { Box, SxProps, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useItems } from "../Contexts/ItemContext";
import ItemCard from "../Components/ItemCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { IListItem } from "../Interfaces";

const RecentlyAdded = () => {
  const { fetchItemsFromDb, items } = useItems();
  AOS.init({ once: true });
  useEffect(() => {
    fetchItemsFromDb();
  }, []);
  items.length = 6;

  return (
    <Box sx={MainItemsContainer}>
      <Typography sx={secTitle}>Recently added items</Typography>
      <Box
        sx={itemsContainer}
        data-aos="fade-left"
        data-aos-offset="200"
        data-aos-duration="1000"
      >
        {items.map((item: IListItem) => (
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
  );
};
const MainItemsContainer: SxProps = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  maxWidth: "100%",
  mt: 8,
  minHeight: 250,
  overflowX: "hidden",
};
const itemsContainer: SxProps = {
  display: "flex",
  justifyContent: "center",
  maxWidth: "100%",
  minHeight: { xs: "170px", md: "250px", lg: "250px", xl: "250px" },
  flexWrap: { xs: "wrap", md: "wrap", lg: "wrap", xl: "wrap" },
  margin: "auto",
  position: "relative",
  userSelect: "none",
};
const secTitle: SxProps = {
  maxWidth: "100%",
  fontSize: { xs: "12px", md: "20px", lg: "20px", xl: "20px" },
  ml: "12%",
  mb: 2,
  fontWeight: "bold",
  color: "rgba(0, 0, 0, .7)",
};
export default RecentlyAdded;
