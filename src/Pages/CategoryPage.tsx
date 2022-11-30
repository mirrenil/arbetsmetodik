import React from "react";
import { useParams } from "react-router-dom";

function CategoryPage() {
  const { name } = useParams();
  console.log(name);
  return (
    <div style={{marginTop: '200px'}}>
      <h1>Hey this is a Category page {name}</h1>
    </div>
  );
}

export default CategoryPage;
