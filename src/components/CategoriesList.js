import React, { useState, useEffect } from "react";

import axios from "axios";

const CategoriesList = ({ category }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      const list = response.data.categories;
      console.log(response.data);

      setList(list);
    });
  }, []);

  return (
    <div className="items-list">
      {list
        .filter((item) =>
          item.name.toLowerCase().includes(category.toLowerCase())
        )
        .map((category) => category.id)}
    </div>
  );
};

export default CategoriesList;
