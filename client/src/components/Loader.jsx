import React, { useContext } from "react";
import { FaSpinner } from "react-icons/fa";
import { ThemeContext } from "../Context/ThemeContext";

const Loader = () => {
    const {theme} = useContext(ThemeContext)
  return (
    <div className="container loader__container">
      <FaSpinner className={`spinner__icon ${theme}`} />
    </div>
  );
};

export default Loader;
