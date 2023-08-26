"use client";

import { useEffect, useReducer, useState } from "react";
import { initialState, cartReducer } from "../reducers/cartReducer";
// import {
//   deleteProductFromCartService,
//   getCartItemsService,
//   postAddProductToCartService,
//   postUpdateProductQtyCartService,
// } from "../../api/apiServices";
import { actionTypes } from "../utils/actiontypes";
import { useProductsContext } from "./";
// import { notify } from "../../utils/utils";

import { useSession } from "next-auth/react";
import CartProvider from "../components/providers/cartProvider";

const CartContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const { updateInCartOrInWish, clearCarted } = useProductsContext();
  const [loadingCart, setLoadingCart] = useState(false);
  const [disableCart, setDisableCart] = useState(false);

  const [state, dispatch] = useReducer(cartReducer, initialState);
  // console.log("state", state);

  useEffect(() => {
    if (session) {
      // setLoadingCart(true);
      (async () => {
        try {
          const response = await fetch(`/api/cart/${session.user.id}`, {
            method: "GET",
          });
          const cart = await response.json();
          // const cartRes = await getCartItemsService(token);

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          dispatch({
            type: actionTypes.INITIALIZE_CART,
            payload: JSON.parse(cart),
          });
        } catch (err) {
          return;
          // notify(
          //   "error",
          //   err?.response?.data?.errors
          //     ? err?.response?.data?.errors[0]
          //     : err?.response?.data?.message
          // );
          // } finally {
          //   // setLoadingCart(false);
          // }
        }
      })();
    }
  }, [session]);

  const addProductToCart = async (product) => {
    setDisableCart(true);

    product = {
      id: product.id,
      quantity: 1,
      price: product.price,
    };
    try {
      const response = await fetch(`/api/cart/${session.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const cart = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      dispatch({
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: [{ ...product, qty: 1 }, ...state.cart],
      });
      updateInCartOrInWish(product.id, "inCart", true);
      // notify("success", "Product Added to Cart");
    } catch (err) {
      // notify(
      //   "error",
      //   err?.response?.data?.errors
      //     ? err?.response?.data?.errors[0]
      //     : "Some Error Occurred!!"
      // );
    } finally {
      setDisableCart(false);
    }
  };

  const updateProductQtyInCart = async (productId, type) => {
    setDisableCart(true);

    const product = {
      id: productId,
      type: type,
    };
    try {
      const response = await fetch(`/api/cart/${session.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const cart = await response.json();
      dispatch({
        type: actionTypes.UPDATE_PRODUCT_QTY_IN_CART,
        payload: JSON.parse(cart),
      });

      //   const response = await fetch(`/api/cart/${session.user.id}`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(product),
      //   });
      //   // const response = await postUpdateProductQtyCartService(
      //   //   productId,
      //   //   type,
      //   //   session
      //   // );
      //   console.log({ response });
      //   if (response.status === 200 || response.status === 201) {
      //     if (type === "increment") {
      //       dispatch({
      //         type: actionTypes.UPDATE_PRODUCT_QTY_IN_CART,
      //         payload: state.cart.map((product) =>
      //           product.id === productId
      //             ? { ...product, qty: product.quantity + 1 }
      //             : product
      //         ),
      //       });
      //     } else {
      //       dispatch({
      //         type: actionTypes.UPDATE_PRODUCT_QTY_IN_CART,
      //         payload: state.cart.map((product) =>
      //           product.id === productId
      //             ? { ...product, qty: product.quantity - 1 }
      //             : product
      //         ),
      //       });
      //     }
      //   }
    } catch (err) {
      // notify(
      //   "error",
      //   err?.response?.data?.errors
      //     ? err?.response?.data?.errors[0]
      //     : "Some Error Occurred!!"
      // );
    } finally {
      setDisableCart(false);
    }
  };

  const deleteProductFromCart = async (productId) => {
    setDisableCart(true);
    try {
      const response = await fetch(`/api/cart/${session.user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productId),
      });
      const cart = await response.json();
      console.log("cart", cart);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      dispatch({
        type: actionTypes.DELETE_PRODUCTS_FROM_CART,
        payload: JSON.parse(cart),
      });

      updateInCartOrInWish(productId, "inCart", false);
      //   notify("info", "Product Removed from Cart");
      // }
    } catch (err) {
      console.log(err);
      // notify(
      //   "error",
      //   err?.response?.data?.errors
      //     ? err?.response?.data?.errors[0]
      //     : "Some Error Occurred!!"
      // );
    } finally {
      setDisableCart(false);
    }
  };

  const clearCart = () => {
    state.cart.map(async ({ id }) => {
      try {
        const response = await fetch(`/api/cart/${session.user.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        });
        const cart = await response.json();
        console.log("cart", cart);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        dispatch({
          type: actionTypes.DELETE_PRODUCTS_FROM_CART,
          payload: JSON.parse(cart),
        });

        updateInCartOrInWish(productId, "inCart", false);
        //   notify("info", "Product Removed from Cart");
      } catch (err) {
        console.log(err);
        // notify(
        //   "error",
        //   err?.response?.data?.errors
        //     ? err?.response?.data?.errors[0]
        //     : "Some Error Occurred!!"
        // );
      } finally {
        setDisableCart(false);
      }
    });
    updateInCartOrInWish();
  };

  // const { totalPriceOfCartProducts, actualPriceOfCart } = {
  //   totalPriceOfCartProducts: 900,
  //   actualPriceOfCart: 10000,
  // };
  // const { totalPriceOfCartProducts, actualPriceOfCart } = state.cart.reduce(
  //   (acc, { qty, price, newPrice }) => ({
  //     totalPriceOfCartProducts: acc.totalPriceOfCartProducts + qty * newPrice,
  //     actualPriceOfCart: acc.actualPriceOfCart + qty * price,
  //   }),
  //   { totalPriceOfCartProducts: 0, actualPriceOfCart: 0 }
  // );

  const { actualPriceOfCart } = state.cart.reduce(
    (acc, { quantity, price }) => ({
      actualPriceOfCart: acc.actualPriceOfCart + quantity * price,
    }),
    { actualPriceOfCart: 0 }
  );

  return (
    <CartProvider.Provider
      value={{
        cart: state.cart,
        disableCart,
        loadingCart,
        addProductToCart,
        updateProductQtyInCart,
        deleteProductFromCart,
        // totalPriceOfCartProducts,
        actualPriceOfCart,
        clearCart,
      }}
    >
      {children}
    </CartProvider.Provider>
  );
};

export default CartContextProvider;
