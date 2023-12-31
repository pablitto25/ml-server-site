import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import Header from "../components/Header";
import Loader from "../components/Loader";
import SellerInfo from "../components/SellerInfo";
import SellerItems from "../components/SellerItems";

const SellerDetail = () => {
  const { sellerId, marketplace } = useParams();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const ACCESS_TOKEN = "";

  const fetchAllItems = async (offset = 0, accumulatedItems = []) => {
    const url = `https://api.mercadolibre.com/sites/${marketplace}/search?seller_id=${sellerId}&offset=${offset}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();

      const allItems = accumulatedItems.concat(responseData.results);

      // Si hay más listings para cargar, hacemos otra llamada a la API con el offset actualizado.
      if (responseData.paging && responseData.paging.total > offset + 50) {
        return fetchAllItems(offset + 50, allItems);
      } else {
        return {
          seller: responseData.seller, // Retornamos datos del vendedor
          results: allItems, // Retornamos todos los listings
        };
      }
    } catch (err) {
      setError(err.message);
      console.log("There was a problem with the fetch operation:", err.message);
      return {};
    }
  };

  useEffect(() => {
    fetchAllItems().then((fullData) => {
      setData(fullData);
    });
  }, [sellerId, marketplace]);

  return (
    <>
      <Header />
      <main className={theme}>
        <div className="container">
          <section className={`seller__detail ${theme}`}>
            {data ? (
              <>
                <SellerInfo seller={data.seller} />
                <SellerItems listings={data.results} />
              </>
            ) : (
              <Loader />
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default SellerDetail;
