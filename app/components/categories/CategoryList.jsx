import { useProductsContext } from "../../contexts/index";
import CategoryCard from "./CategoryCard";

const CategoryList = ({ catRef }) => {
  const { categoryList } = useProductsContext();

  return (
    <>
      <h1 className="mt-10 break-words text-center text-3xl text-gray-600 md:text-4xl">
        <span className="border-b-4 border-yellow-400 pb-1">Search for</span>
      </h1>

      <section
        className="mt-1  grid  grid-cols-1    gap-4  py-4 md:grid-cols-2"
        ref={catRef}
      >
        {categoryList.map((categoryItem) => (
          <CategoryCard key={categoryItem.id} category={categoryItem} />
        ))}
      </section>
    </>
  );
};

export default CategoryList;
