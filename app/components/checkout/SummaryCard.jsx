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
    <section className="py-3 md:py-7 px-5 md:px-7 lg:px-12 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-5 w-full h-min">
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
      <div className="flex justify-between items-center">
        <p className=" text-gray-600">Total</p>
        <p className="text-xl text-zinc-900">
          Rs. {totalPriceOfCart.toFixed(2)}
        </p>
      </div>
      <div className="w-full py-2   flex gap-4 items-center">
        <button
          onClick={() => {
            //Direct to Payment Gateway
          }}
          className="btn-rounded-primary rounded-full flex items-center gap-2 md:text-sm lg:text-base"
        >
          Place Order
        </button>
      </div>
    </section>
  );
};

export default SummaryCard;
