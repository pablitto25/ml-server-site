import React, { useContext } from "react";
import Header from "../components/Header";
import SellerInfo from "../components/SellerInfo";
import SellerItems from "../components/SellerItems";

const SellerDetail = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <section className="seller__detail">
            <SellerInfo />
            <SellerItems />
          </section>
        </div>
      </main>
    </>
  );
};

export default SellerDetail;
