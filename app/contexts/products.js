"use client";

import { useEffect, useReducer, useState } from "react";
import { initialState, productsReducer } from "../reducers/productsReducer";
import { actionTypes, addressTypes, filterTypes } from "../utils/actiontypes";
import ProductProvider from "/app/components/providers/productsProvider.jsx";
import { useSession } from "next-auth/react";

export default function ProductsContextProvider({ children }) {
  const { data: session } = useSession();
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const [currentAddress, setCurrentAddress] = useState(state.addressList[0]);
  const [isOrderPlaced, setisOrderPlaced] = useState(false);

  useEffect(() => {
    try {
      const getProducts = async () => {
        const response = await fetch("/api/products", {
          method: "GET",
        });

        const products = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        dispatch({
          type: actionTypes.INITIALIZE_PRODUCTS,
          payload: JSON.parse(products),
        });
      };
      const getCategories = async () => {
        const response = await fetch("/api/categories", {
          method: "GET",
        });

        const categories = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return dispatch({
          type: actionTypes.INITIALIZE_CATEGORIES,
          payload: JSON.parse(categories),
        });
      };

      getProducts();
      getCategories();
    } catch (error) {
      return new Error(error);
    }
  }, [session]);

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
    dispatch({
      type: addressTypes.ADD_ADDRESS,
      payload: [newAddress, ...state.addressList],
    });
  };
  const updateAddress = (addressId, updatedAddress) => {
    dispatch({
      type: addressTypes.ADD_ADDRESS,
      payload: state.addressList.map((item) =>
        item.id === addressId ? updatedAddress : item
      ),
    });
    if (currentAddress.id === addressId) {
      setCurrentAddress(updatedAddress);
    }
  };
  const deleteAddress = (addressId) => {
    dispatch({
      type: addressTypes.ADD_ADDRESS,
      payload: state.addressList.filter(({ id }) => id !== addressId),
    });
    if (currentAddress.id === addressId) {
      setCurrentAddress({});
    }
  };
  const isInCart = (productId) =>
    state.allProducts.find((item) => item.id === productId && item.inCart);

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
        addressList: state.addressList,
        isInCart,
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
      }}
    >
      {children}
    </ProductProvider.Provider>
  );
}
