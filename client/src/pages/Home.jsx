import React, { useContext } from "react";
import Header from "./../components/Header";
/* import HomeInfo from "../components/HomeInfo"; */
import Sellers from "../components/Sellers";
import { ThemeContext } from "../Context/ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Header />
      <div className={`home ${theme}`}>
        <section className="home__sellers">
          {/* <HomeInfo/> */}
          <Sellers/> 
        </section>
      </div>
      
      
    </>
  );
};

export default Home;
