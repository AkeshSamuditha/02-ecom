import { useProductsContext } from "../../contexts/index";
import TrendingCard from "./TrendingCard";

const TrendingList = () => {
  const { trendingProducts } = useProductsContext();
  return (
    <section className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3   lg:grid-cols-4 gap-4  py-10 mt-10">
      {/* <h1 className="text-3xl md:text-4xl lg:text-5xl  break-words flex items-center text-opacity-40 ">
        Featured
      </h1> */}
      <div className="flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-500 flex items-center font-semibold leading-tight">
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
