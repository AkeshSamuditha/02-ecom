import React from "react";
import { useProductsContext } from "../../contexts";

const SortBy = () => {
  const {
    applyFilters,
    filters: { sortBy },
  } = useProductsContext();
  return (
    <label>
      <select
        placeholder="Sort By"
        name="sortBy"
        value={sortBy}
        className="w-max py-1 px-2 rounded-md cursor-pointer shadow-md   hover:shadow-lg "
        onChange={(e) => applyFilters("sortBy", e.target.value)}
      >
        <option value="low_to_high" className="Low_to_High">
          Sort by Price : Low to High
        </option>
        <option value="high_to_low" className="high_to_low">
          Sort by Price : High to Low
        </option>
      </select>
    </label>
  );
};

export default SortBy;
