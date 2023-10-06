"use client";

import { useEffect, useState } from "react";
import { getProduct } from "@app/actions/serverActions";

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
        name: product.name,
        quantity: 1,
        price: product.price,
        image: product.image,
      };
      updateCart.push(newCartItem);
    }
    localStorage.setItem("cart", JSON.stringify(updateCart));

    setCart(updateCart);
  };

  //type: "increment" | "decrement"
  const updateProductQtyInCart = async (productId, type) => {
    const cartItem = cart.find((cartItem) => cartItem.id === productId);
    const product = await getProduct(productId);

    if (!product) {
      deleteProductFromCart(productId);
      return new Error({ message: "Product not found" });
    }
    if (type === "increment" && cartItem.quantity >= product.quantity) {
      return new Error({ message: "You only can add this" });
    }

    if (type === "decrement" && cartItem.quantity === 1) {
      deleteProductFromCart(productId);
      return;
    }

    if (type === "increment") {
      cartItem.quantity += 1;
    } else if (type === "decrement") {
      cartItem.quantity -= 1;
    }
    const updateCart = [...cart];
    setCart(updateCart);
    localStorage.setItem("cart", JSON.stringify(cart));
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
