import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faCube } from "@fortawesome/free-solid-svg-icons";

import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

const TrendingCard = ({ product }) => {
  return (
    <>
      <Link
        href={`/products/${product.id}`}
        className="flex flex-col   px-4 py-2 rounded-xl  bg-black/[.02] cursor-pointer  hover:shadow-lg transition "
      >
        <div className="flex justify-between items-center gap-4 xs:flex-wrap xs:justify-center sm:flex-nowrap sm:justify-between">
          <div>
            <div className="flex items-right text-gray-500">
              <FontAwesomeIcon icon={faTag} className="mr-1" />
              {product.category}
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-lg font-semibold">Rs.{product.price}</h1>
            {/* Any additional elements you want to add */}
          </div>
        </div>

        {/* <button className="p-0.5 custom-bg-gradient rounded-md ms-2">
                {product.inCart ? (
                  <AiOutlineCheck className="text-white font-bold text-sm" />
                  ) : (
                    <AiOutlinePlus className="text-white font-bold text-sm" />
                    )}
                  </button> */}
        <div className="flex justify-center items-center w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            height={200}
            width={150}
            className="rounded-xl w-40 h-90 xs:w-50 xs:h-75 sm:w-60 sm:h-90 py-2 object-cover hover:scale-110 transition"
          />
        </div>
        <br />
        <div className=" flex item-center justify-center">
          <span className="text-2xl" role="img" aria-label="Product Emoji">
            🌟
          </span>
          <h1 className="text-xl text-center font-semibold text-gray-800">
            {product.name}
          </h1>
        </div>
      </Link>
    </>
  );
};

export default TrendingCard;
