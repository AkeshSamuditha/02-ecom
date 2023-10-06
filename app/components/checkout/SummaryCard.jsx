import React from "react";
import { useCartContext } from "@app/contexts";
import PriceDetailsCard from "./PriceDetailsCard";
import ItemCard from "./itemCard";

const SummaryCard = () => {
  const { cart, totalPriceOfCart } = useCartContext();

  const totalItems = cart.reduce((count, product) => {
    return count + product.quantity;
  }, 0);

  return (
    <section className="flex h-min w-full flex-col gap-5 rounded-md bg-white/[0.7] px-5 py-3 shadow-sm md:px-7 md:py-7 lg:px-12">
      <h1 className="text-2xl font-bold">Order Summary</h1>
      Items in Cart
      {cart.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
      <hr />
      <PriceDetailsCard
        totalItems={totalItems}
        totalPriceOfCart={totalPriceOfCart}
      />
      <hr />
      <div className="flex items-center justify-between">
        <p className=" text-gray-600">Total</p>
        <p className="text-xl text-zinc-900">
          Rs. {totalPriceOfCart.toFixed(2)}
        </p>
      </div>
      <div className="flex w-full   items-center gap-4 py-2">
        <button
          onClick={() => {
            //Direct to Payment Gateway
          }}
          className="btn-rounded-primary flex items-center gap-2 rounded-full md:text-sm lg:text-base"
        >
          Place Order
        </button>
      </div>
    </section>
  );
};

export default SummaryCard;
