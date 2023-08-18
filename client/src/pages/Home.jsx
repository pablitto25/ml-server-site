import React from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <main className="container">
        <section>
          <h1>Home</h1>
          <h3>
            <Link to={"/sellers/MLA/23742253"}>Seller detail page</Link>
          </h3>
          <h3>
            <Link to={"/dsadsa"}>Error page</Link>
          </h3>
        </section>
      </main>
    </>
  );
};

export default Home;
