import { AiOutlineClose } from "react-icons/ai";
import Checkbox from "./Checkbox";
import InputRange from "./InputRange";
import InputRadioType2 from "./InputRadioType2";
import { useProductsContext } from "../../contexts/index";
import { useEffect } from "react";

const collectionsList = ["Summer", "Winter", "Spring", "Autumn"];

const FilterHeading = ({ text }) => <h2 className="mb-4 text-xl">{text}</h2>;

const Filters = ({ isFilterOpen, setIsFilterOpen }) => {
  const { clearFilters, categoryList } = useProductsContext();

  useEffect(() => {
    categoryList.unshift({ name: "All" });
  }, [categoryList]);

  return (
    <aside
      className={`filtersContainer fixed  top-0 z-10 flex h-screen flex-col gap-3 overflow-auto p-3
    transition-all duration-300 ease-in-out  ${
      isFilterOpen ? "left-0 " : "-left-96"
    }
    `}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Filter Products</h1>
        <AiOutlineClose
          className="cursor-pointer text-xl"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        />
      </div>
      <button
        className="w-16 rounded-md bg-black/[0.2] px-2 py-0.5  text-center text-sm font-semibold shadow-sm transition-colors hover:bg-gray-800 hover:text-white "
        onClick={clearFilters}
      >
        Clear
      </button>
      <section className="py-3">
        <FilterHeading text="Categories" />
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {categoryList.map((data, index) => (
            <InputRadioType2 data={data.name} key={index} />
          ))}
        </div>
      </section>
      <section className="py-3">
        <InputRange />
      </section>
      <section className="py-3">
        <FilterHeading text="Collections" />
        <div className="flex flex-col gap-2">
          {collectionsList.map((data, index) => (
            <Checkbox data={data} key={index} />
          ))}
        </div>
      </section>
    </aside>
  );
};

export default Filters;
