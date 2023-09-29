"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { BiFilter } from "react-icons/bi";
import { MdKeyboardArrowUp } from "react-icons/md";

import { useFilter } from "../../utils/filtersHook";
import { Filters, SingleProduct, SortBy } from "../../components";

const ProductListing = () => {
  const productsList = useFilter();
  // console.log(productsList);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleShowArrow = () => {
      if (window.scrollY > 300) {
        setShowScrollArrow(true);
      } else {
        setShowScrollArrow(false);
      }
    };
    window.addEventListener("scroll", toggleShowArrow);

    return () => {
      window.removeEventListener("scroll", toggleShowArrow);
    };
  }, []);

  return (
    <div>
      <header className="mb-4">
        <Image
          height={100}
          width={1200}
          src="bannerHeader.jpg?updatedAt=1693002785315"
          alt="bannerImg"
          className="rounded-md max-h-25 min-h-[10rem] object-cover"
        />
      </header>
      <section className="py-3 flex flex-col md:flex-row gap-2 justify-between">
        <h1 className="text-2xl font-bold">Pulse for You!</h1>
        <div className="flex items-center gap-2">
          <Filters
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />
          <SortBy />
          <button
            className={`flex py-1 px-2 rounded-md shadow-md items-center  gap-1 hover:bg-[--primary-text-color] hover:text-white hover:shadow-lg ${
              isFilterOpen ? "bg-[--primary-text-color] text-white" : ""
            }`}
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
            }}
          >
            <BiFilter className="text-lg" />
            <span className="text-sm">Filters</span>
          </button>
        </div>
      </section>

      {productsList.length > 0 ? (
        <main className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {productsList.map((dress) => (
            <SingleProduct key={dress.id} product={dress} />
          ))}
        </main>
      ) : (
        <p className="font-sans text-4xl  font-bold uppercase  tracking-wide text-gray-300 text-center w-full py-32">
          Nothing to Show!
        </p>
      )}
      <button
        className={` fixed bottom-10 bg-gray-800 right-2 p-2 rounded-full text-xl shadow-2xl transition-all delay-100 ease-in-out ${
          showScrollArrow ? "block" : "hidden"
        }`}
        onClick={scrollToTop}
      >
        <MdKeyboardArrowUp className=" text-white" />
      </button>
    </div>
  );
};
export default ProductListing;
