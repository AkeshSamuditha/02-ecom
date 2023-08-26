"use client";
import React from "react";

import { useRef } from "react";
import { Banner, CategoryList, Trending } from "../components";
import Footer from "../components/Footer";

const Home = () => {
  const catRef = useRef(null);
  return (
    <>
      <Banner catRef={catRef} />
      <Trending />
      <CategoryList catRef={catRef} />
      <Footer />
    </>
  );
};

export default Home;
