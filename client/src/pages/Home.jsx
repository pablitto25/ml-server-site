import React from "react";
import Header from "./../components/Header";
/* import HomeInfo from "../components/HomeInfo"; */
import Sellers from "../components/Sellers";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        <section className="home__sellers">
          {/* <HomeInfo/> */}
          <Sellers/> 
        </section>
      </div>
      
      
    </>
  );
};

export default Home;
