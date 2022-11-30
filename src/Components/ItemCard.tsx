import {
  Box,
  Card,
  CardContent,
  CardMedia,
  SxProps,
  Typography,
} from "@mui/material";
import React, { CSSProperties, useContext } from "react";
import { useAuth } from "../Contexts/authContext";
import { ListItem } from "../Interfaces";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
interface Props {
  item: ListItem;
}

const ItemCard = ({ item }: Props) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // This will be added back in when the listings are connected to a user

  // const deleteListing = async (id: string) => {
  //   const itemToRemove = doc(db, "listings", id);
  //   await deleteDoc(itemToRemove);
  //   alert("Listing with id " + id + " has been deleted");
  // };

  return (
    <Card sx={boxStyle}>
      {/* This will be added back in when the listings are connected to a user */}

      {/* {currentUser && (
        <Box>
          <button
            style={{
              border: "none",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
            onClick={() => deleteListing(item.id)}
          >
            <ClearIcon />
          </button>
        </Box>
      )} */}
      <CardMedia
        component="img"
        src={item.image}
        height="100"
        sx={{ borderRadius: "6px", cursor: "pointer" }}
        onClick={() => navigate(`/items/'${item.id}`)}
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
        }}
      >
        <Typography>{item.title}</Typography>
        <Typography>{item.price} :-</Typography>
      </CardContent>
    </Card>
  );
};

const boxStyle: SxProps = {
  width: "10rem",
  height: "10rem",
  padding: "1rem",
};

export default ItemCard;
