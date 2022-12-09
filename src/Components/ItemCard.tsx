import {
  Box,
  Card,
  CardContent,
  CardMedia,
  SxProps,
  Typography,
} from "@mui/material";
import React from "react";
import { IListItem } from "../Interfaces";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface Props {
  item: IListItem;
}

const ItemCard = ({ item }: Props) => {
  const navigate = useNavigate();

  return (
    <Card sx={boxStyle} onClick={() => navigate(`/items/'${item.id}`)}>
      <CardMedia
        component="img"
        src={item.image}
        height="100"
        sx={{ borderRadius: "6px", cursor: "pointer" }}
      />
      <Typography sx={itemTitle}>{item.title}</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={itemLocation}>
          {item.location}

          <LocationOnIcon sx={{ fontSize: "1rem" }} />
        </Typography>
      </Box>
      <CardContent sx={itemInfo}>
        <Typography sx={itemPrice}>{item.price}:-</Typography>
      </CardContent>
    </Card>
  );
};

const boxStyle: SxProps = {
  width: { xs: "7rem", md: "10rem", lg: "10rem", xl: "10rem" },
  height: "12rem",
  padding: "1rem",
  margin: "1rem",
  marginBottom: { xs: "1rem", md: "1rem", lg: "1rem", xl: "1rem" },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const itemInfo: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "0",
  padding: "0",
  "&:last-child": {
    paddingBottom: 0,
  },
};

const itemTitle: SxProps = {
  padding: "0",
  textAlign: "center",
  fontSize: "1rem",
  fontWeight: "bold",
};

const itemLocation: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontStyle: "italic",
};

const itemPrice: SxProps = {
  padding: "0",
  fontSize: "1.2rem",
  textAlign: "center",
};

export default ItemCard;
