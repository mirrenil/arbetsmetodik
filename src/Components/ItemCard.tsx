import {
  Box,
  Card,
  CardContent,
  CardMedia,
  SxProps,
  Typography,
} from "@mui/material";
import React, { CSSProperties, useContext } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { IListItem } from "../Interfaces";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { fontWeight, margin } from "@mui/system";

interface Props {
  item: IListItem;
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
    <Card sx={boxStyle} onClick={() => navigate(`/items/'${item.id}`)}>
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
        // onClick={() => navigate(`/items/'${item.id}`)}
      />
      <CardContent sx={itemInfo}>
        <Typography sx={itemTitle}>{item.title}</Typography>
        <Typography sx={itemPrice}>{item.price}:-</Typography>
      </CardContent>
    </Card>
  );
};

const boxStyle: SxProps = {
  width: { xs: "8rem", md: "10rem", lg: "10rem", xl: "10rem" },
  height: "10rem",
  padding: "1rem",
  marginBottom: { xs: "1rem", md: "0", lg: "0", xl: "0" },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const itemInfo: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  // marginTop: "15px",
  margin: "0",
  padding: "0",
  "&:last-child": {
    paddingBottom: 0,
  },
};

const itemTitle: SxProps = {
  padding: "0",
  textAlign: "center",
};

const itemPrice: SxProps = {
  padding: "0",
  fontWeight: "bold",
  fontSize: "1.2rem",
  textAlign: "center",
};

export default ItemCard;
