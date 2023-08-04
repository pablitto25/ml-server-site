import React from "react";
import { Link } from "react-router-dom";

const SellerItems = () => {
  return (
    <div className="seller__items">
      <table>
        <caption>
          {" "}
          <h3>Publicaciones del vendedor</h3>
        </caption>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Rating</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="" alt="" />
            </td>
            <td>Producto 1</td>
            <td>$150</td>
            <td>3.5</td>
            <td>
              <Link to={"/"} target="_blank">
                Link
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <img src="" alt="" />
            </td>
            <td>Producto 1</td>
            <td>$150</td>
            <td>3.5</td>
            <td>
              <Link to={"/"} target="_blank">
                Link
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SellerItems;
