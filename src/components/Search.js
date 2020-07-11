import React, { useState, useEffect } from "react";

import "./Search.css";
import Button from "react-bootstrap/Button";

const Search = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleFilter(event) {
    setFilter(event.target.value);
  }

  //   function handleInput(event) {
  //     setInput(event.target.value);
  //   }

  return (
    <div className="center-section">
      <div className="search-bar">
        <p>Enter search terms below</p>

        <form>
          <input
            className="inputSearch"
            type="text"
            onChange={handleSearch}
            placeholder="Search..."
            value={search}
            name="search"
          ></input>
        </form>
      </div>

      <div className="filter-options">
        <select value={filter} onChange={handleFilter}></select>
        <option value="categories">Categories</option>
      </div>
    </div>
  );
};

export default Search;
