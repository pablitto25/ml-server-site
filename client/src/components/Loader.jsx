import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="loader__container">
      <FaSpinner className="spinner__icon" />
    </div>
  );
};

export default Loader;
