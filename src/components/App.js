import React, { useState, useEffect } from "react";

import { ProductsList } from "./index";
import TopNavigation from "./TopNavigation";
import BottomNavigation from "./BottomNavigation";

const App = () => {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });

  return (
    <div className="App">
      <TopNavigation />
      TEST:
      <ProductsList />
      <BottomNavigation />
    </div>
  );
};

export default App;
