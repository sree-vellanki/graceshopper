import React, { useState, useEffect } from "react";

import { getSomething } from "../api";

import "./Search.css";

const Search = ({ search, setSearch, category, setCategory }) => {
  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleCategory(event) {
    setCategory(event.target.value);
  }

  console.log("These are the categories: ", category);
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
          <select
            id="lang"
            onChange={(event) => {
              handleCategory(event);
              setCategory(event.target.value);
            }}
            value={category}
          >
            <option value="hat">hats</option>
            <option value="shirt">shirts</option>
            <option value="shoes">shoes</option>
            <option value="keychain">keychains</option>
            <option value="hoodie">hoodies</option>
            <option value="poster">posters</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default Search;

/*
  <div className="dropdown">
            <button className="drop-button" onChange={handleCategory}>
              Select a category
            </button>
            <div className="dropdown-content">
            */
