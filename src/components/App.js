import React, { useState, useEffect } from "react";

import { getSomething } from "../api";

import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  //   function handleSearch(event) {
  //     setSearch(event.target.value);
  //   }

  //   return (
  //     <div className="App">
  //       <h1>Grace Shopper Project...</h1>

  //       <div id="searchBox">
  //         <form>
  //           <input
  //             type="text"
  //             onChange={handleSearch}
  //             placeholder="Search here..."
  //             value={search}
  //             name="search"
  //           />
  //         </form>
  //       </div>
  //       <h2>{message}</h2>
  //     </div>
  //   );
};

export default App;
