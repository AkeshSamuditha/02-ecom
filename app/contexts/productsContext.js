"use client";

import { useEffect, useReducer, useState } from "react";
import { initialState, productsReducer } from "../reducers/productsReducer";
import { actionTypes, filterTypes } from "../utils/actiontypes";
import ProductProvider from "/app/components/providers/productsProvider.js";
import { getProducts, getcategories } from "@app/actions/serverActions";

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
          : [],
      );

      setLoadingProducts(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateInCartOrInWish = (productId, type, value) => {
    if (productId) {
      dispatch({
        type: actionTypes.UPDATE_PRODUCTS,
        payload: state.allProducts.map((item) =>
          item.id === productId ? { ...item, [type]: value } : item,
        ),
      });
      // notify(notifyTypes.SUCCESS, "Product Added to Cart");
    } else {
      dispatch({
        type: actionTypes.UPDATE_PRODUCTS,
        payload: state.allProducts.map((item) => ({
          ...item,
          inCart: false,
          qty: 0,
        })),
      });
      // notify(notifyTypes.SUCCESS, "Cart Emptied");
    }
  };

  const applyFilters = (filterType, filterValue) => {
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
    (product) => product.isfeatured,
  );

  const addAddress = (newAddress) => {
    addressList.unshift(newAddress);
    const updatedList = addressList;
    setAddressList(updatedList);

    localStorage.setItem("AddressList", JSON.stringify(addressList));
    // notify(notifyTypes.SUCCESS, "Address Succesfully Added");
  };

  const updateAddress = (addressId, updatedAddress) => {
    const updatedList = addressList.map((item) =>
      item.id === addressId ? updatedAddress : item,
    );

    setAddressList(updatedList);

    if (currentAddress.id === addressId) {
      setCurrentAddress(updatedAddress);
    }

    localStorage.setItem("AddressList", JSON.stringify(addressList));
    // notify(notifyTypes.SUCCESS, "Address Succesfully Updated");
  };

  const deleteAddress = (removingAddress) => {
    const addressId = removingAddress.id;
    // const updatedList = addressList.filter(
    //   (address) => address.id !== addressId
    // );

    // console.log(addressList);
    setAddressList((prevAddressList) =>
      prevAddressList.filter((address) => address.id !== addressId),
    );

    // if (currentAddress.id === addressId && updatedList.length > 0) {
    //   setCurrentAddress(updatedList[0]);
    // }
    // console.log(addressList);
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
        // getProductById,
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
