import React from "react";

const PriceCard = ({ product }) => {
  return (
    <div key={product.id} className=" flex justify-between  ">
      <p className=" flex-1 text-gray-600">
        {product.name} <br />({product.quantity}) items
      </p>

      <p className="font-cabin text-lg">
        Rs. {(product.quantity * product.price).toFixed(2)}
      </p>
    </div>
  );
};

export default PriceCard;
