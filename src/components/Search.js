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

  console.log(category);
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

          <div className="dropdown">
            <button className="drop-button" onChange={handleCategory}>
              Select a category
            </button>
            <div className="dropdown-content">
              <select
                id="lang"
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
                value={category}
              >
                <option value="hat">hats</option>
                <option value="shirt">shirts</option>
                <option value="shoes">shoes</option>
                <option value="keychain">keychains</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
