import React, { useState } from "react";
import Image from "next/image";
import imageKitLoader from "../../utils/imageKitLoader";
import { useProductsContext } from "../../contexts/index";
import { useRouter } from "next/navigation";

const CategoryCard = ({ category }) => {
  const navigate = useRouter();
  const { applyFilters } = useProductsContext();
  const [showCategory, setShowCategory] = useState(true);
  const clickHandler = () => {
    applyFilters("categories", [category.categoryname]);
    navigate.push("/products", { state: { from: "category" } });
  };
  return (
    <section
      className=" flex flex-col items-center rounded-xl  bg-black/[.06] cursor-pointer gap-3 relative overflow-hidden  categoryContainer"
      onClick={clickHandler}
    >
      <Image
        loader={imageKitLoader}
        src={category.image}
        alt={category.categoryname}
        width={400}
        height={50}
        className="rounded-xl h-full w-full object-cover transition-all delay-75 ease-out"
      />
      <div
        className="
             flex flex-col w-full h-full justify-center items-center
            transition-all delay-75 absolute left-0 right-0 bottom-0 top-0 bg-black/[0.3] rounded-xl"
      >
        <h1 className="text-4xl xs:text-6xl sm:text-8xl lg:text-6xl font-extrabold capitalize text-[--theme-color] shadow-sm p-3 break-all">
          {category.name}
        </h1>
      </div>
    </section>
  );
};

export default CategoryCard;
