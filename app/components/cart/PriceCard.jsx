import React from "react";

const PriceCard = ({ product }) => {
  return (
    <div key={product.id} className=" flex justify-between  ">
      <p className=" text-gray-600 flex-1">
        {product.name} <br />({product.quantity}) items
      </p>

      <p className="text-lg font-cabin">
        Rs. {(product.quantity * product.price).toFixed(2)}
      </p>
    </div>
  );
};

export default PriceCard;
