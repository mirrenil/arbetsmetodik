import { Box, SxProps, Typography } from "@mui/material";
import React, { useEffect, useContext } from "react";
import { useItems } from "../Contexts/ItemContext";
import ItemCard from "../Components/ItemCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const RecentlyAdded = () => {
  const { categories, fetchItemsFromDb, items } = useItems();

  useEffect(() => {
    fetchItemsFromDb();
    AOS.init();
    AOS.refresh();
  }, []);
  items.length = 4;

  return (
    <div>
      <Box sx={MainItemsContainer}>
        <Typography sx={secTitle}>Recently added items</Typography>
        <Box
          sx={itemsContainer}
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          {items.map((item) => (
            <Link to={`/items/${item.id}`} key={item.id}>
              <ItemCard item={item} />
            </Link>
          ))}
        </Box>
      </Box>
    </div>
  );
};
const MainItemsContainer: SxProps = {
  width: "100%",
  mt: 8,
  minHeight: 250,
};
const itemsContainer: SxProps = {
  display: "flex",
  width: { xs: "100%", md: "90%", lg: "80%", xl: "80%" },
  minHeight: { xs: "170px", md: "250px", lg: "250px", xl: "250px" },
  flexWrap: { xs: "wrap", md: "no-wrap", lg: "no-wrap", xl: "no-wrap" },
  margin: "auto",
  position: "relative",
  userSelect: "none",
};
const itemDiv: SxProps = {
  width: { xs: "45%", md: "150px", lg: "200px", xl: "250px" },
  height: { xs: "150px", md: "150px", lg: "200px", xl: "250px" },
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  boxShadow: 5,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  cursor: "pointer",
  mb: 2,
};
const imgBox: SxProps = {
  height: { xs: "140px", md: "200px", lg: "200px", xl: "200px" },
  mb: 3,
  mt: 1,
  width: { xs: "150px", md: "200px", lg: "200px", xl: "200px" },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const infoBox: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  width: "90%",
  margin: "auto",
  paddingBottom: 1,
};
const secTitle: SxProps = {
  fontSize: { xs: "12px", md: "20px", lg: "20px", xl: "20px" },
  ml: "7%",
  fontWeight: "bold",
  color: "rgba(0, 0, 0, .7)",
};
export default RecentlyAdded;
