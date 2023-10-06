import React from "react";
import { useProductsContext } from "../../contexts/index";

const InputRange = () => {
  const {
    maxRange,
    applyFilters,
    filters: { priceRange },
  } = useProductsContext();

  return (
    <>
      <h2 className="mb-4 text-xl">Price Range:</h2>
      <label>
        <input
          type="range"
          min="0"
          max={maxRange}
          step="2"
          name="priceRange"
          value={priceRange}
          className="w-full cursor-pointer accent-[--primary-text-color]"
          onChange={(e) => applyFilters(e.target.name, e.target.value)}
        />
        <div className="flex w-full justify-between p-0">
          <span>0</span>
          <span>{Math.floor(maxRange / 2)}</span>
          <span>{maxRange}</span>
        </div>
      </label>
    </>
  );
};

export default InputRange;
