import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStarHalfAlt,
  FaChartArea,
  FaUserAlt,
} from "react-icons/fa";

const SellerInfo = () => {
  return (
    <div className="seller__info">
      <h1>SHIPIN.AR</h1>
      <h3>
        <FaMapMarkerAlt />
        Dirección
      </h3>
      <h4>
        {" "}
        <FaStarHalfAlt />
        Reputación
      </h4>
      <h5>
        {" "}
        <FaChartArea />
        Total de ventas:{" "}
      </h5>
      <Link to={"/"} target="_blank">
        <FaUserAlt />
        Perfil en ml
      </Link>
    </div>
  );
};

export default SellerInfo;
