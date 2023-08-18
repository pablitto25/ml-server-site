import React from "react";
import { Link } from "react-router-dom";
import { FcRightUp } from "react-icons/fc";

const SellerItems = ({ listings }) => {
  const getBrandValue = (attributes) => {
    const brandAttribute = attributes.find((attr) => attr.id === "BRAND");
    return brandAttribute ? brandAttribute.value_name : "N/A";
  };

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
            <th>Marca</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad vendida</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing.id}>
              <td>
                <img src={listing.thumbnail} alt="" />
              </td>
              <td>{getBrandValue(listing.attributes)}</td>
              <td>{listing.title}</td>
              <td>{`$${listing.price}`}</td>
              <td>{listing.sold_quantity}</td>
              <td className="cta">
                <Link to={listing.permalink} target="_blank">
                  <FcRightUp />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerItems;
