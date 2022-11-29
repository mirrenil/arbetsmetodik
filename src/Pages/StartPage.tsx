import StartPageHero from "../Components/StartPageHero";
import RecentlyAdded from "../Components/RecentlyAdded";
import StartPageInfo from "../Components/StartPageInfo";
import CategoryCard from "../Components/CategoryCard";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
const StartPage: React.FC = (props) => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      let dataWithId: any[] = [];
      const querySnapshot = await getDocs(collection(db, "categories"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data["id"] = doc.id;
        // doc.data() is never undefined for query doc snapshots
        dataWithId.push(data);
        setCategories(dataWithId);
      });
    };
    fetchCategories();
  }, []);
  return (
    <>
      {/* Header will go here from layout */}
      <StartPageHero />
      <CategoryCard />
      <RecentlyAdded />
      <StartPageInfo />
      {/* Footer will go here from layout */}
    </>
  );
};

export default StartPage;
