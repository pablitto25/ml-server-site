import React, { useContext } from "react";
import Header from "./../components/Header";
import { ThemeContext } from "../Context/ThemeContext";
import SellersBusquedaEspecifica from "../components/SellersBusquedaEspecifica";

const SellerBusqueda = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Header />
      <div className={`home ${theme}`}>
        <section className="home__sellers">
          <SellersBusquedaEspecifica/> 
        </section>
      </div>
      
      
    </>
  );
};

export default SellerBusqueda;
