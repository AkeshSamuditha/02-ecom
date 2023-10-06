"use client";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import { PiShootingStarThin } from "react-icons/pi";

const TrendingCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex flex-col px-4 mb-8 item-center justify-start transition-transform relative ${
        isHovered ? "scale-110" : ""
      }`}
    >
      <Link href={`/products/${product.id}`}>
        <div className="flex justify-center items-start text-yellow-800">
          <PiShootingStarThin className="text-3xl" />
          <h1 className="text-lg text-center ml-2   border-b border-yellow-500">
            {product.name}
          </h1>
        </div>
        <div
          className={`flex mt-2 justify-center rounded-lg transition-transform ${
            isHovered ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
          }`}
        >
          <h1 className="text-md font-cabin text-gray-500">
            Rs. {product.price.toFixed(2)}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.name}
            height={400}
            width={300}
            className="rounded-xl w-70 h-120 xs:w-80 xs:h-120 sm:w-150 sm:h-150 object-cover"
          />
        </div>
      </Link>
    </div>
  );
};

export default TrendingCard;
