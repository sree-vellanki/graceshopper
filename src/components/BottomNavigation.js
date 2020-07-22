import React, { useState, useEffect } from "react";

import "./BottomNavigation.css";

const BottomNavigation = () => {
  const [bottomNav, setBottomNav] = useState("");

  function handleBottomNav(event) {
    setBottomNav(event.target.value);
  }

  return (
    <div className="bottom-nav">
      <a href="#contact" class="active">
        Contact
      </a>
      <a href="#news">News</a>
    </div>
  );
};

export default BottomNavigation;
