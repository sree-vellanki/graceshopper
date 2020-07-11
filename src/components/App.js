import React, { useState, useEffect } from "react";

import { getSomething } from "../api";

import "./App.css";
import Header from "./Header";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch } from "react-router-dom";

const App = () => {
  // const [message, setMessage] = useState("");
  // const [search, setSearch] = useState("");

  // useEffect(() => {
  //   getSomething()
  //     .then((response) => {
  //       setMessage(response.message);
  //     })
  //     .catch((error) => {
  //       setMessage(error.message);
  //     });
  // });

  //   function handleSearch(event) {
  //     setSearch(event.target.value);
  //   }

  return (
    <div className="App">
      <Header />

      <Search />
    </div>
  );
};

export default App;
