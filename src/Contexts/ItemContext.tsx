/* eslint-disable */
import { getDocs, collection } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import { IListItem, Category } from "../Interfaces";

interface ItemContext {
  items: IListItem[];
  categories: Category[];
  fetchItemsFromDb: () => void;
  fetchCategoriesFromDb: () => void;
  categoryId: string;
  setSelectedCategoryId: (categoryId: string) => void;
}

const ItemsContext = createContext<ItemContext>({
  items: [],
  categories: [],
  fetchItemsFromDb: () => [],
  fetchCategoriesFromDb: () => [],
  categoryId: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedCategoryId: () => {},
});

export default function ItemProvider(props: any) {
  const [items, setItems] = useState<IListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");

  const fetchItemsFromDb = async () => {
    const itemDataWithId: any[] = [];
    const querySnapshot = await getDocs(collection(db, "listings"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data["id"] = doc.id;
      itemDataWithId.push(data);
      setItems(itemDataWithId);
    });
  };

  const fetchCategoriesFromDb = async () => {
    const categoryDataWithId: any[] = [];
    const querySnapshot = await getDocs(collection(db, "categories"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data["id"] = doc.id;
      categoryDataWithId.push(data);
      setCategories(categoryDataWithId);
    });
  };

  const setSelectedCategoryId = (categoryId: string) => {
    setCategoryId(categoryId);
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        categories,
        fetchItemsFromDb,
        fetchCategoriesFromDb,
        categoryId,
        setSelectedCategoryId,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
}

export const useItems = () => useContext(ItemsContext);
