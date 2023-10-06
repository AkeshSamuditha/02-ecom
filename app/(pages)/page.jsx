"use client";
import React from "react";

import { useRef, useEffect, useState } from "react";
import { Banner, CategoryList, Trending } from "../components";
import Footer from "../components/Footer";

const Home = () => {
  const catRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true

  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the delay
    }, 2000);
  }, []);
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
