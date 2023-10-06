"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useCartContext } from "../../contexts";

import EmptyCart from "../../components/cart/EmptyCart";
import CartItemCard from "../../components/cart/CartItemCard";
import PriceCard from "../../components/cart/PriceCard";

const Cart = () => {
  const { cart, totalPriceOfCart } = useCartContext();

  const navigate = useRouter();

  return (
    <div className="py-2 ">
      {cart.length > 0 && (
        <h1 className="text-2xl font-bold p-3 ">Cart({cart.length})</h1>
      )}
      {cart.length ? (
        <div className="md:grid md:grid-cols-3 gap-5">
          <main className="md:col-span-2">
            {cart.map((product) => (
              <CartItemCard key={product.id} product={product} />
            ))}
          </main>
          <section className="md:col-span-1 py-7 px-7 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-6 w-full h-min">
            <h1 className="text-xl font-bold">Price Details</h1>

            {cart.map((product) => (
              <PriceCard key={product.id} product={product} />
            ))}

            <hr />
            <div className="flex justify-between items-center text-2xl">
              <p className=" text-gray-600">Total</p>
              <p className="font-cabin">Rs. {totalPriceOfCart.toFixed(2)}</p>
            </div>

            <div className="w-full py-2   flex gap-4 justify-center">
              <button
                className="btn-rounded-primary rounded-full flex items-center gap-2 md:text-sm lg:text-base"
                onClick={() => {
                  setTimeout(() => {
                    navigate.push("/checkout", {
                      state: "cart",
                    });
                  }, 100);
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </section>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
