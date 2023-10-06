import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useProductsContext } from "../../contexts/index";

const CategoryCard = ({ category }) => {
  const navigate = useRouter();

  const { applyFilters } = useProductsContext();

  const clickHandler = () => {
    applyFilters("gender", category.name);
    navigate.push("/products", { state: { from: "category" } });
  };

  return (
    <section
      className=" categoryContainer relative flex cursor-pointer  flex-col items-center gap-3 overflow-hidden rounded-xl  bg-black/[.06]"
      onClick={clickHandler}
    >
      <Image
        src={category.image}
        alt={category.name}
        width={400}
        height={50}
        className="h-full w-full rounded-xl object-cover transition-all delay-75 ease-out"
      />
      <div
        className="
             absolute bottom-0 left-0 right-0 top-0 flex
            h-full w-full flex-col items-center justify-center rounded-xl bg-black/[0.3] transition-all delay-75"
      >
        <h1 className="xs:text-3xl break-all p-3 text-4xl font-extrabold capitalize text-[--theme-color] shadow-sm sm:text-6xl lg:text-7xl">
          {category.name}
        </h1>
      </div>
    </section>
  );
};

export default CategoryCard;
