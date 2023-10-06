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
        <h1 className="p-3 text-2xl font-bold ">Cart({cart.length})</h1>
      )}
      {cart.length ? (
        <div className="gap-5 md:grid md:grid-cols-3">
          <main className="md:col-span-2">
            {cart.map((product) => (
              <CartItemCard key={product.id} product={product} />
            ))}
          </main>
          <section className="flex h-min w-full flex-col gap-6 rounded-md bg-white/[0.7] px-7 py-7 shadow-sm md:col-span-1">
            <h1 className="text-xl font-bold">Price Details</h1>

            {cart.map((product) => (
              <PriceCard key={product.id} product={product} />
            ))}

            <hr />
            <div className="flex items-center justify-between text-2xl">
              <p className=" text-gray-600">Total</p>
              <p className="font-cabin">Rs. {totalPriceOfCart.toFixed(2)}</p>
            </div>

            <div className="flex w-full   justify-center gap-4 py-2">
              <button
                className="btn-rounded-primary flex items-center gap-2 rounded-full md:text-sm lg:text-base"
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
