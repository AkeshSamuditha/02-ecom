"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { HiOutlineShoppingBag } from "react-icons/hi";

import { useCartContext } from "@app/contexts";

const CartButton = ({ product }) => {
  const navigate = useRouter();

  const { addProductToCart, disableCart, isInCart } = useCartContext();

  const [inCart, setInCart] = useState(isInCart(product.id));

  const updateCart = () => {
    addProductToCart(product);
    setInCart(isInCart(product.id));
  };

  return (
    <div>
      <button
        disabled={disableCart}
        className="btn-rounded-secondary flex items-center justify-center gap-2 text-base
             hover:bg-amber-600 hover:text-white hover:scale-105 transform transition disabled:cursor-not-allowed"
        onClick={() => {
          if (!inCart) {
            updateCart();
          } else {
            navigate.push("/cart");
          }
        }}
      >
        <div className="animate-pulse">
          <HiOutlineShoppingBag className="text-xl" />
        </div>
        {inCart ? "Go to Cart" : "Add to Cart"}
      </button>
      {inCart && (
        <div className="text-sm text-center  text-red-500 px-2 py-1">
          Already added to cart
        </div>
      )}
    </div>
  );
};

export default CartButton;
