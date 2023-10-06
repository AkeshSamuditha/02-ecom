// Not implemented yet. Can Implement as Request

import { useProductsContext } from "../../contexts/index";

const Checkbox = ({ data }) => {
  const {
    applyFilters,
    filters: { categories },
  } = useProductsContext();

  const checkboxHandler = (e) => {};
  return (
    <label className="cursor-pointer capitalize">
      <input
        className="me-2 cursor-pointer accent-[--primary-text-color]"
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
