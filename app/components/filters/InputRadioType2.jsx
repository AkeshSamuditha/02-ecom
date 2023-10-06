import React from "react";
import { useProductsContext } from "../../contexts/index";

const InputRadioType2 = ({ data }) => {
  const {
    applyFilters,
    filters: { gender },
  } = useProductsContext();
  return (
    <label
      className={`rounded-md p-2  text-center capitalize shadow-sm ${
        gender === data
          ? "bg-[--primary-text-color] text-white "
          : "bg-black/[0.1] hover:bg-[--primary-text-color] hover:text-white"
      } cursor-pointer`}
    >
      {data}
      <input
        type="radio"
        name="gender"
        value={data}
        className="invisible"
        selected={gender === data}
        onChange={(e) => applyFilters(e.target.name, e.target.value)}
      />
    </label>
  );
};

export default InputRadioType2;
