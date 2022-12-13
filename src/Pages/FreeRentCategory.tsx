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
            <Box sx={categoryContainer}>
                <Box sx={categoryDiv}>
                    <Box
                        component="img"
                        sx={categoryImg}
                        alt="Free image"
                        src={
                            "https://quantlabs.net/blog/wp-content/uploads/2021/08/free.jpg"
                        }
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography sx={mainTitle}> Free</Typography>
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
        </Box>
    );
};
const wrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: { xs: 0, md: "100px", lg: "100px", xl: "100px" },
    minHeight: 1000,
};
const categoryContainer: SxProps = {
    width: { xs: "100%", md: "90%", lg: "90%", xl: "90%" },
    position: "relative",
    mt: 10,
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
    fontSize: { xs: "20px", md: "30px", lg: "40px", xl: "40px" },
};
const itemsContainer: SxProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
};
export default FreeRentCategory;
