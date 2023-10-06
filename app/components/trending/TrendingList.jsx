"use server";
import { useProductsContext } from "../../contexts/index";
import TrendingCard from "./TrendingCard";

const TrendingList = () => {
  const { trendingProducts } = useProductsContext();
  return (
    <section className="xs:grid-cols-2  mt-10 grid grid-cols-1   gap-4 py-10  md:grid-cols-3 lg:grid-cols-4">
      <div className="flex items-center justify-center">
        <h1 className="flex items-center text-3xl font-semibold leading-tight text-gray-500 md:text-4xl lg:text-5xl">
          <span className="border-b-4 border-yellow-400 pb-1">Featured</span>
        </h1>
      </div>

      {trendingProducts.map((product) => (
        <TrendingCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default TrendingList;
