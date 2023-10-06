"use client";

import { useState } from "react";

import { HiOutlineShoppingBag } from "react-icons/hi";
import { notify } from "@app/utils/notify";
import { useCartContext } from "@app/contexts";

const CartButton = ({ product }) => {
  const { addProductToCart, disableCart, isInCart, deleteProductFromCart } =
    useCartContext();

  const [inCart, setInCart] = useState(isInCart(product.id));

  const addToCart = () => {
    addProductToCart(product);
    setInCart(!inCart);
    notify("success", "added to cart");
  };

  const removeFromCart = () => {
    deleteProductFromCart(product.id);
    setInCart(!inCart);
    notify("success", "removed from the cart");
  };

  return (
    <div className="transform transition hover:scale-105 disabled:cursor-not-allowed">
      {inCart ? (
        <button
          disabled={disableCart}
          className="btn-rounded-secondary flex items-center justify-center gap-2 text-base 
              "
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
          className="btn-rounded-secondary flex transform items-center justify-center gap-2 
            text-base transition hover:scale-105 hover:border-none hover:bg-green-600 hover:text-white disabled:cursor-not-allowed"
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
