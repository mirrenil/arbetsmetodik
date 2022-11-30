import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ListItem } from "../Interfaces";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  SxProps,
  IconButton,
} from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import Dave from "../Assets/Images/Dave.png";

function DetailPage() {
  const listingCollection = collection(db, "listings");
  const { id } = useParams();
  const [item, setItem] = useState<ListItem>();
  useEffect(() => {
    async function setDocumentData() {
      const documents: any = await getDocs(listingCollection);
      const listingsProvided: any = [];
      documents.forEach((doc: any) => {
        let listing = doc.data();
        listing = { ...listing, id: doc.id };
        listingsProvided.push(listing);
      });
      const listingProvided = listingsProvided.find(
        (item: any) => item.id === id
      );
      return setItem(listingProvided);
    }
    setDocumentData();
  }, []);

  return (
    <Box sx={wrapper}>
      <Card sx={itemContainer}>
        <CardMedia
          component="img"
          image={item?.image}
          alt={item?.image}
          sx={itemImage}
        />
        <CardContent sx={cardHeaders}>
          <Box sx={titlePrice}>
            <Typography gutterBottom variant="h5" component="div">
              {item?.title}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {item?.price}:- per day
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {item?.description}
          </Typography>
        </CardContent>
        <Card sx={lessorCard}>
          <Box sx={lessorCardLeftInfo}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                David Jensen
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Member since: 1231 23 123
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                View profile
              </Typography>
            </CardContent>
          </Box>
          <CardMedia component="img" sx={lessorPic} image={Dave} alt="Dave" />
        </Card>
        <Button sx={button} variant="contained">
          Send a request
        </Button>
      </Card>
    </Box>
  );
}

const wrapper: SxProps = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
};

const itemContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: { xs: "80%", md: "50%", lg: "50%", xl: "50%" },
  height: "50%",
  boxShadow: "none",
};
const cardHeaders: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
};
const titlePrice: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

const itemImage: CSSProperties = {
  height: "40%",
  width: "100%",
};

const lessorCard: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "98%",
  height: "191",
  boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.29)",
};

const lessorCardLeftInfo: SxProps = {
  display: "flex",
  flexDirection: "column",
};

const lessorPic: SxProps = {
  width: { xs: "25%", md: "12%", lg: "12%", xl: "12%" },
};

const button: SxProps = {
  marginTop: "1rem",
  marginBottom: "2rem",
  width: "40%",
  height: "15%",
};

export default DetailPage;
