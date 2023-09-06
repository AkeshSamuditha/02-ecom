"use client";

import { useEffect, useReducer, useState } from "react";
import { useProductsContext } from "./index";
import { getProduct } from "@app/actions/serverActions";
// import { notify } from "../../utils/utils";

import CartProvider from "../components/providers/cartProvider";

// type cartItem = {
//   id: string;
//   quantity: number;
//   price: number;
// }

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [disableCart, setDisableCart] = useState(false);
  const [totalPriceOfCart, setTotalPriceOfCart] = useState(0);

  useEffect(() => {
    initializeCart();
  }, []);

  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (acc, { quantity, price }) => acc + quantity * price,
      0
    );
    setTotalPriceOfCart(newTotalPrice);
  }, [cart]);

  const initializeCart = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addProductToCart = (product) => {
    const updateCart = [...cart];
    const cartItem = updateCart.find((cartItem) => cartItem.id === product.id);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      const newCartItem = {
        id: product.id,
        quantity: 1,
        price: product.price,
      };
      updateCart.push(newCartItem);
    }
    localStorage.setItem("cart", JSON.stringify(updateCart));

    setCart(updateCart);
  };

  //type: "increment" | "decrement"
  const updateProductQtyInCart = async (productId, type) => {
    const updateCart = [...cart];
    const cartItem = updateCart.find((cartItem) => cartItem.id === productId);

    if (type === "increment") {
      const product = await getProduct(productId);
      if (cartItem.quantity === product.quantity)
        return alert("You can't add more than available quantity");
      cartItem.quantity += 1;
    } else {
      if (cartItem.quantity === 1) {
        deleteProductFromCart(productId);
      } else {
        cartItem.quantity -= 1;
      }
    }
    localStorage.setItem("cart", JSON.stringify(updateCart));
    setCart(updateCart);
    return cartItem.quantity;
  };

  const deleteProductFromCart = (productId) => {
    const updateCart = cart.filter((cartItem) => cartItem.id !== productId);
    setCart(updateCart);
    localStorage.setItem("cart", JSON.stringify(updateCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const isInCart = (productId) => {
    return cart.some((cartItem) => cartItem.id === productId);
  };

  return (
    <CartProvider.Provider
      value={{
        cart,
        disableCart,
        loadingCart,
        addProductToCart,
        updateProductQtyInCart,
        deleteProductFromCart,
        totalPriceOfCart,
        // totalPriceOfCartProducts,
        totalPriceOfCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartProvider.Provider>
  );
};

export default CartContextProvider;
