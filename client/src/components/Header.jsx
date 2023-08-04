import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`header__primary ${theme}`}>
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
            {" "}
            <img src="/brand-latamly-group.png" alt="" />
          </Link>
        </div>
        <nav className="navbar__primary">
          <ul>
            <li onClick={() => toggleTheme()}>Color switch</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
