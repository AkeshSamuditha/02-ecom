"use client";
import { usePathname, useRouter } from "next/navigation";

import { CiSearch } from "react-icons/ci";
import { filterBySearch } from "../../utils/filterUtils";
import { useProductsContext } from "../../contexts/index";
import { useEffect, useState } from "react";
import CartItemCard from "../cart/CartItemCard";
import spinningLoaders from "../../../public/assets/loaderBlack.svg";
const Search = () => {
  const navigate = useRouter();
  const location = usePathname();

  const { allProducts, applyFilters } = useProductsContext();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showList, setShowList] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (location !== "/products") {
      setSearch("");
    }
  }, [location]);
  useEffect(() => {
    setSearching(true);
    let id;
    id = setTimeout(() => {
      setFilteredData(filterBySearch(search, allProducts));
      setSearching(false);
      if (location === "/products" && !search) {
        applyFilters("searchText", search);
      }
    }, 500);

    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, search]);

  const changeHandler = (e) => {
    setSearch(e.target.value);
    if (!showList) setShowList(true);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    applyFilters("searchText", search);
    setShowList(false);
    navigate.push("/products");
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className={`flex items-center bg-black/[0.075] px-3 ${
          search && showList ? "rounded-t-md" : "rounded-full"
        } text-sm transition`}
      >
        <input
          className="w-full py-2 px-3 bg-transparent focus:outline-none"
          type="search"
          value={search}
          placeholder="Search Glasses"
          onChange={changeHandler}
        />
        <CiSearch />
      </form>
      {search && showList && (
        <ul className="absolute bg-amber-50 w-full max-h-72 overflow-auto rounded-b-md z-10">
          {searching ? (
            <li className="h-10 flex items-center justify-center">
              <image src={spinningLoaders} alt="Searching..." />
            </li>
          ) : filteredData.length ? (
            filteredData.map((product) => (
              <li key={product.id} className="">
                <CartItemCard
                  product={product}
                  isSearch={true}
                  setSearch={setSearch}
                />
              </li>
            ))
          ) : (
            <li className="h-10 flex items-center justify-center">
              No Item to show
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default Search;
