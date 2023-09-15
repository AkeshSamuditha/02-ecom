"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { HiOutlineShoppingBag } from "react-icons/hi";

import { useCartContext } from "@app/contexts";

const CartButton = ({ product }) => {
  const navigate = useRouter();

  const { addProductToCart, disableCart, isInCart, deleteProductFromCart } =
    useCartContext();

  const [inCart, setInCart] = useState(isInCart(product.id));

  const addToCart = () => {
    addProductToCart(product);
    setInCart(!inCart);
  };

  const removeFromCart = () => {
    deleteProductFromCart(product.id);
    setInCart(!inCart);
  };

  return (
    <div>
      {inCart ? (
        <button
          disabled={disableCart}
          className="btn-rounded-secondary flex items-center justify-center gap-2 text-base 
              hover:scale-105 transform transition disabled:cursor-not-allowed"
          onClick={() => {
            removeFromCart();
          }}
        >
          <div className="animate-pulse">
            <HiOutlineShoppingBag className="text-xl" />
          </div>
          Remove from Cart
        </button>
      ) : (
        <button
          disabled={disableCart}
          className="btn-rounded-secondary flex items-center justify-center gap-2 text-base 
            hover:bg-green-600 hover:text-white hover:border-none hover:scale-105 transform transition disabled:cursor-not-allowed"
          onClick={() => {
            addToCart();
          }}
        >
          <div className="animate-pulse">
            <HiOutlineShoppingBag className="text-xl" />
          </div>
          Add to Cart
        </button>
      )}

      {/* {inCart && (
        <div className="text-sm text-center  text-red-500 px-2 py-1">
          Already added to cart
        </div>
      )} */}
    </div>
  );
};

export default CartButton;
