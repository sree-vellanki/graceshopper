import React, { useState, useEffect } from "react";

import axios from "axios";
import ProductCard from "./ProductCard";

const ProductsList = ({ search, category }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      const list = response.data.products;
      console.log(response.data);

      setList(list);
    });
  }, []);

  return (
    <div className="items-list">
      {list
        .filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((item) =>
          item.name.toLowerCase().includes(category.toLowerCase())
        )
        .map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
    </div>
  );
};

export default ProductsList;
