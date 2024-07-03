import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <div className="my-4">
        <Categorys />
      </div>
    </div>
  );
};

export default Home;
