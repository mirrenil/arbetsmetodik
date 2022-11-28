import { getDocs, collection } from "firebase/firestore";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { ListItem } from '../Interfaces'



interface ItemContext {
    
    items: ListItem[]
    categories: string[]
}


const ItemsContext = createContext<ItemContext>({
  items: [],
  categories: []
}) 
export const APIContext = createContext<any>({})

export default function ItemProvider (props: any)  {
    const [items, setItems] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    
    useEffect(() => {
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
      fetchItemsFromDb()
    }, [])
  
    useEffect(() => {
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
      fetchCategoriesFromDb()
    }, [])
    
   
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
    <APIContext.Provider
    value={{
        items, 
        categories, 
    }}
    >
        {props.children}
    </APIContext.Provider>
  );
}; 

export const useItems = () => useContext(ItemsContext);







