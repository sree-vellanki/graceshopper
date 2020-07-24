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
<<<<<<< HEAD
      <main>
        <ProductsList />
      </main>
=======
     
      TEST:
      <body>
        <ProductsList search={search} category={category} />
      </body>
>>>>>>> 3c958399a44ea7bde4f60f19fa47ca5fdd98c247
      <footer>
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default App;
