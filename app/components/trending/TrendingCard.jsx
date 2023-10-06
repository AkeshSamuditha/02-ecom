"use server";
import Link from "next/link";

import Image from "next/image";

import { PiShootingStarThin } from "react-icons/pi";

const TrendingCard = ({ product }) => {
  return (
    <div className="item-center group relative mb-8 flex flex-col justify-start px-4 transition-transform hover:scale-110">
      <Link href={`/products/${product.id}`}>
        <div className="flex items-start justify-center text-yellow-800">
          <PiShootingStarThin className="text-3xl" />
          <h1 className="ml-2 border-b border-yellow-500   text-center text-lg">
            {product.name}
          </h1>
        </div>
        <div className="mt-2 flex justify-center rounded-lg opacity-0 transition-transform group-hover:scale-y-100 group-hover:opacity-100">
          <h1 className="text-md font-cabin text-gray-500">
            Rs. {product.price.toFixed(2)}
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            height={400}
            width={300}
            className="w-70 h-120 xs:w-80 xs:h-120 sm:w-150 sm:h-150 rounded-xl object-cover"
          />
        </div>
      </Link>
    </div>
  );
};

export default TrendingCard;
