import React from "react";
import { Link } from "react-router-dom";

const HomeInfo = () => {
    return (
        
        <div>
        <h1>Home</h1>
          <h3>
            <Link to={"/sellers/1"}>Seller detail page</Link>
          </h3>
          <h3>
            <Link to={"/dsadsa"}>Error page</Link>
          </h3>
        </div>
    );
};

export default HomeInfo;
