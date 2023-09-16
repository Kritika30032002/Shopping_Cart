import React from "react";
import Products from "../components/Products";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mx-6 my-4 mt-20 ">
        <section>
          <h3 className="text-center mb-4  text-6xl">Products</h3>
          <Products />
        </section>
      </div>
    </>
  );
};

export default Home;
