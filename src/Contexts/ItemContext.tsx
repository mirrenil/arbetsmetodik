import { getDocs, collection } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import { ListItem, Category } from "../Interfaces";

interface ItemContext {
  items: ListItem[];
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
  const [items, setItems] = useState<ListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");

  const fetchItemsFromDb = async () => {
    const itemDataWithId: any[] = [];
    const querySnapshot = await getDocs(collection(db, "listings"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      data["id"] = doc.id;
      // doc.data() is never undefined for query doc snapshots
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
      // doc.data() is never undefined for query doc snapshots
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
