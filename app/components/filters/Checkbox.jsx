// Not implemented yet. Can Implement as Request

import { useProductsContext } from "../../contexts/index";

const Checkbox = ({ data }) => {
  const {
    applyFilters,
    filters: { categories },
  } = useProductsContext();

  const checkboxHandler = (e) => {
  };
  return (
    <label className="capitalize cursor-pointer">
      <input
        className="accent-[--primary-text-color] me-2 cursor-pointer"
        type="checkbox"
        name="categories"
        // checked={categories.includes(data)}
        value={data}
        onChange={checkboxHandler}
      />
      {data}
    </label>
  );
};

export default Checkbox;
