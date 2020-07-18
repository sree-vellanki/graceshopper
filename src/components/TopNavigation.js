import React, { useState, useEffect } from "react";

import "./TopNavigation.css";

const TopNavigation = () => {
  const [navigation, setNavigation] = useState("");

  function handleNavigation(event) {
    setNavigation(event.target.value);
  }

  return (
    <div className="top-nav">
      <ul>
        <li>
          <a href="cart.asp">Cart</a>
        </li>
        <li>
          <a href="login.asp">Login</a>
        </li>
        <li>
          <a href="register.asp">Register</a>
        </li>
      </ul>
    </div>
  );
};

export default TopNavigation;
