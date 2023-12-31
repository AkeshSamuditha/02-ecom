import { useProductsContext } from "../../contexts/index";
import CategoryCard from "./CategoryCard";

const CategoryList = ({ catRef }) => {
  const { categoryList } = useProductsContext();

  return (
    <>
      <h1 className="text-3xl md:text-4xl break-words text-center mt-10 text-gray-600">
        <span className="border-b-4 border-yellow-400 pb-1">Search for</span>
      </h1>

      <section
        className="grid  grid-cols-1  md:grid-cols-2    gap-4  py-4 mt-1"
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
