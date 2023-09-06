"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useCartContext } from "../../contexts";
import { useProductsContext } from "../../contexts";

import CartItemCard from "../../components/cart/CartItemCard";
import PriceCard from "../../components/cart/PriceCard";

const Cart = () => {
  const { cart, totalPriceOfCart } = useCartContext();
  const { loadingProducts } = useProductsContext();
  const [isOrderPlaced, setisOrderPlaced] = useState(false);

  const navigate = useRouter();
  if (loadingProducts) {
    // waiting till products are loading
    return;
  }

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
            <h1 className="text-xl">Price Details</h1>
            {cart.map((product) => (
              <PriceCard key={product.id} product={product} />
            ))}

            <hr />
            <div className="flex justify-between items-center">
              <p className=" text-gray-600">Total</p>
              <p className="text-2xl">Rs. {totalPriceOfCart}</p>
            </div>

            <div className="w-full py-2   flex gap-4 items-center">
              <button
                className="btn-rounded-primary rounded-full flex items-center gap-2 md:text-sm lg:text-base"
                onClick={() => {
                  setisOrderPlaced(true);
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
        <div className="h-[60vh] w-full flex flex-col items-center justify-center  gap-3 ">
          <Image
            width={200}
            height={200}
            src="empty-shopping-bag.png"
            alt="empty Cart"
            className="h-36 -rotate-12 mt-5 drop-shadow-lg"
          />

          <div className="text-center">
            <h2 className="text-2xl font-bold">Hey, it feels so light!</h2>
            <p className="text-sm text-gray-400">
              There is nothing in your Cart. Let us add some items.
            </p>
          </div>

          <Link href="/products">
            <div className="btn-rounded-secondary text-sm mt-5">Explore</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
