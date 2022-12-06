/* eslint-disable */
import StartPageHero from "../Components/StartPageHero";
import RecentlyAdded from "../Components/RecentlyAdded";
import StartPageInfo from "../Components/StartPageInfo";
import CategoryCard from "../Components/CategoriesContainer";
import { getDocs, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const StartPage = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const dataWithId: any[] = [];
      const querySnapshot = await getDocs(collection(db, "categories"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        dataWithId.push(data);
        setCategories(dataWithId);
      });
    };
    fetchCategories();
  }, []);
  return (
    <>
      <StartPageHero />
      <CategoryCard />
      <RecentlyAdded />
      <StartPageInfo />
    </>
  );
};

export default StartPage;
