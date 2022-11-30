import { Box, SxProps, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "../Components/ItemCard";
import { useItems } from "../Contexts/ItemContext";
import { ListItem } from "../Interfaces";

function CategoryPage() {
  const { name } = useParams();
  const {
    items,
    categories,
    fetchCategoriesFromDb,
    fetchItemsFromDb
  } = useItems();

  useEffect(() => {
    fetchCategoriesFromDb()
    fetchItemsFromDb()
  }, [])
  const chosenCategory = categories.find(c => c.title === name)
  const chosenCategoryImg: any = chosenCategory?.img
  const CategoryItems = items.filter((item) => item.category.toLowerCase() === chosenCategory?.title)
  
  return (
    <Box sx={{mt: { xs: 0, md: 40, lg: 40, xl: 40}, minHeight: 1000}}>
      <Box>
        <Typography sx={mainTitle}> Category / {chosenCategory?.title} </Typography>
      </Box>
    <Box   sx={categoryContainer}>
        <Box
            sx={categoryDiv}
            key={chosenCategory?.id}
            data-aos="fade-in"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            <Box sx={categoryTitleDiv}>
              <Typography sx={categoryTitle}>{chosenCategory?.title}</Typography>
            </Box>
            <Box
              component="img"
              sx={{
                width: { xs: "150px", md: "500px", lg: "700px", xl: "700px" },
                height: { xs: "100px", md: "400px", lg: "450px", xl: "500px" },
                borderRadius: "10px",
              }}
              alt=""
              src={chosenCategoryImg}
            />
          </Box>
          <Box 
            sx={itemsContainer}
            data-aos="fade-left"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
          {CategoryItems?.map((item: ListItem) =>
              <ItemCard key={item.id} item={item}/>
          )}
          </Box>
      </Box>
    </Box>
  );
}
const mainTitle: SxProps = {
  marginLeft: 3,
  fontSize: { xs: "20px" , md: "30px" , lg: "40px" , xl: "40px" }
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
const categoryTitleDiv: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: { xs: "150px", md: "500px", lg: "700px", xl: "700px" },
  height:{ xs:  "30px" , md:  "50px" , lg:  "60px" , xl:  "60px"  },
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
  fontSize: { xs: "10px", md: "25px", lg: "25px", xl: "25px" },
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
