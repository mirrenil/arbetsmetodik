import { getDocs, collection } from "firebase/firestore";
import { createContext, FC, useContext, useState } from "react";
import { db } from "../firebase";
import { ListItem } from '../Interfaces'



interface ItemContext {
    fetchItemsFromDb: () => void;
    items: ListItem[]
    fetchCategoriesFromDb: () => void
    categories: string[]
}


const ItemsContext = createContext<ItemContext>({
  fetchItemsFromDb: () => [],
  items: [],
  fetchCategoriesFromDb: () => [], 
  categories: []
}) 

export const ItemProvider = (props: any) => {
    const [items, setItems] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    
    const fetchItemsFromDb = async () => {
      let dataWithId: any[] = []
      const querySnapshot = await getDocs(collection(db, "listings"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let data = doc.data()
        data['id'] = doc.id
        // doc.data() is never undefined for query doc snapshots
        dataWithId.push(data)
        setItems(dataWithId)
      });
    }
    
    const fetchCategoriesFromDb = async () => {
      console.log('start');
      
      let dataWithId: any[] = []
      const querySnapshot = await getDocs(collection(db, "categories"));
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        data['id'] = doc.id
        // doc.data() is never undefined for query doc snapshots
        dataWithId.push(data)
        setCategories(dataWithId)
      });
    }
   
    /// OLD from other project
  //   const fetchProductsFromDb = async () => {
  //   let data = fetch("http://localhost:5500/api/product")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
 


  return (
    <ItemsContext.Provider
    value={{
        items, 
        fetchItemsFromDb, 
        categories, 
        fetchCategoriesFromDb,
    }}
    >
        {props.children}
    </ItemsContext.Provider>
  );
}; 

export const useItems = () => useContext(ItemsContext);







