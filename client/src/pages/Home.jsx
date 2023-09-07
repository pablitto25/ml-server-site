import React, { useContext } from "react";
import { useState } from 'react'
import Header from "./../components/Header";
import Sellers from "../components/Sellers";
import SellersBusquedaEspecifica from "../components/SellersBusquedaEspecifica";
import { ThemeContext } from "../Context/ThemeContext";
import SwitchBusqueda from "../components/SwitchBusqueda";


const Home = () => {
  const { theme } = useContext(ThemeContext);
  const [showSellers, setShowSellers] = useState(true); // Estado para controlar qué componente mostrar
  const toggleComponent = () => {
    setShowSellers(!showSellers); // Cambia el estado para mostrar el otro componente
  };
  return (
    <>
      <Header />
      <SwitchBusqueda onToggle={toggleComponent} /> {/* Pasa la función toggleComponent como prop */}
      <div className={`home ${theme}`}>
        <section className="home__content">
          {showSellers ? <Sellers /> : <SellersBusquedaEspecifica />} {/* Renderiza el componente adecuado según el estado */}
          {/* <Sellers /> */}
        </section>
      </div>
      
      
    </>
  );
};

export default Home;
