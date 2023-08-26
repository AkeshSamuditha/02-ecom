"use client";

import React from "react";
import { useCartContext } from "../../contexts";
import CartItemCard from "../../components/cart/CartItemCard";
import CartTotalCard from "../../components/cart/CartTotalCard";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Cart = () => {
  const { cart } = useCartContext();
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
          <CartTotalCard cart={cart} />
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

          <button
            className="btn-rounded-secondary text-sm mt-5"
            onClick={() => navigate.push("/products")}
          >
            Explore
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
