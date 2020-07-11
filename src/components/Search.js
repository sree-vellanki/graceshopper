import React, { useState, useEffect } from "react";

import { getSomething } from "../api";

import "./Search.css";

const Search = () => {
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  function handleCategory(event) {
    setCategory(event.target.value);
  }

  //   function handleInput(event) {
  //     setInput(event.target.value);
  //   }

  return (
    <div className="center-section">
      <div className="search-bar">
        <p>Enter search terms below:</p>

        <form>
          <input
            className="inputSearch"
            type="text"
            onChange={handleSearch}
            placeholder="Search for merchandise here..."
            value={search}
            name="search"
          ></input>
          <button className="searchButton">Search</button>

          <div className="dropdown">
            <button className="drop-button" onChange={handleCategory}>
              Categories
            </button>
            <div className="dropdown-content">
              <a href="#">Hats</a>
              <a href="#">Shoes</a>
              <a href="#">Tops</a>
              <a href="#">Keychains</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
