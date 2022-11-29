import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useItems } from "../Contexts/ItemContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function DetailPage() {
  const { id } = useParams();

  useEffect(() => {
    const docRef = doc(db, "listings", "DUEZxUzc7qySNggrJZHK");
    getDoc(docRef).then((doc) => {
      console.log(doc.data);
    });
  }, []);

  return (
    <div>
      <h1>Hey this is an item page for item {id}</h1>
    </div>
  );
}

export default DetailPage;
