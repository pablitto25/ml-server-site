import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`header__primary ${theme}`}>
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
            <img src="/brand-latamly-group.png" alt="Latamly Group" />
          </Link>
        </div>
        <nav className="navbar__primary">
          <ul>
            <li className="color__switch" onClick={toggleTheme}>
              { theme === "light" ? <FaMoon /> : <FaSun /> }
              { theme === "light" ? "Oscuro" : "Claro" }
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
