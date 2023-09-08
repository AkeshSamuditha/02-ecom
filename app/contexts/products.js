"use client";

import { use, useEffect, useReducer, useState } from "react";
import { initialState, productsReducer } from "../reducers/productsReducer";
import { actionTypes, addressTypes, filterTypes } from "../utils/actiontypes";
import ProductProvider from "/app/components/providers/productsProvider.jsx";
import { useSession } from "next-auth/react";
import { getProducts, getcategories } from "@app/actions/serverActions";
import Address from "@app/components/address/Address";

export default function ProductsContextProvider({ children }) {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const [addressList, setAddressList] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isOrderPlaced, setisOrderPlaced] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    setCurrentAddress(addressList[0]);
  }, [loadingProducts]);

  useEffect(() => {
    setLoadingProducts(true);
    (async () => {
      const products = await getProducts();

      dispatch({
        type: actionTypes.INITIALIZE_PRODUCTS,
        payload: products,
      });
      const categories = await getcategories();
      dispatch({
        type: actionTypes.INITIALIZE_CATEGORIES,
        payload: categories,
      });

      setAddressList(
        localStorage.getItem("AddressList")
          ? JSON.parse(localStorage.getItem("AddressList"))
          : []
      );
      setLoadingProducts(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductById = (productId) => {
    return state.allProducts.find((product) => product.id === productId);
  };

  const updateInCartOrInWish = (productId, type, value) => {
    if (productId) {
      dispatch({
        type: actionTypes.UPDATE_PRODUCTS,
        payload: state.allProducts.map((item) =>
          item.id === productId ? { ...item, [type]: value } : item
        ),
      });
    } else {
      dispatch({
        type: actionTypes.UPDATE_PRODUCTS,
        payload: state.allProducts.map((item) => ({
          ...item,
          inCart: false,
          qty: 0,
        })),
      });
    }
  };

  const applyFilters = (filterType, filterValue) => {
    console.log(filterType, filterValue);
    dispatch({
      type: filterTypes.FILTERS,
      payload: { filterType, filterValue },
    });
  };
  const clearFilters = () => {
    dispatch({
      type: filterTypes.CLEAR_FILTER,
    });
  };

  const trendingProducts = state.allProducts.filter(
    (product) => product.isfeatured
  );

  const addAddress = (newAddress) => {
    addressList.unshift(newAddress);
    const updatedList = addressList;
    setAddressList(updatedList);

    localStorage.setItem("AddressList", JSON.stringify(addressList));
  };

  const updateAddress = (addressId, updatedAddress) => {
    const updatedList = addressList.map((item) =>
      item.id === addressId ? updatedAddress : item
    );

    setAddressList(updatedList); // Assuming you have a setter function for addressList

    if (currentAddress.id === addressId) {
      setCurrentAddress(updatedAddress);
    }
    localStorage.setItem("AddressList", JSON.stringify(addressList));
  };

  const deleteAddress = (addressId) => {
    const updatedList = addressList.filter(({ id }) => id !== addressId);
    setAddressList(updatedList);

    if (currentAddress.id === addressId) {
      setCurrentAddress(addressList[0]);
    }
    localStorage.setItem("AddressList", JSON.stringify(addressList));
  };

  const isInWish = (productId) =>
    state.allProducts.find((item) => item.id === productId && item.inWish);

  return (
    <ProductProvider.Provider
      value={{
        allProducts: state.allProducts,
        wishlist: state.wishlist,
        filters: state.filters,
        maxRange: state.maxRange,
        categoryList: state.categoryList,
        addressList,
        isInWish,
        isOrderPlaced,
        currentAddress,
        trendingProducts,
        updateInCartOrInWish,
        getProductById,
        applyFilters,
        clearFilters,
        addAddress,
        updateAddress,
        deleteAddress,
        setCurrentAddress,
        setisOrderPlaced,
        loadingProducts,
      }}
    >
      {children}
    </ProductProvider.Provider>
  );
}
