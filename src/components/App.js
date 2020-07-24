import React, { useState } from "react";

import { ProductsList } from "./index";
import TopNavigation from "./TopNavigation";
import Header from "./Header";
import Search from "./Search";
import BottomNavigation from "./BottomNavigation";

const App = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="App">
      <header>
        <TopNavigation />
        <Search
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />
      </header>
      <main>
        <ProductsList search={search} category={category} />
      </main>
      <footer>
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default App;
