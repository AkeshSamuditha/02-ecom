import { useProductsContext } from "../contexts/index";

import {
  filterByCheckbox,
  filterByCategory,
  filterByPriceRange,
  filterBySearch,
  sortByPrice,
} from "../utils/filterUtils";

const useFilter = () => {
  const { allProducts, filters } = useProductsContext();
  const { gender, categories, priceRange, rating, sortBy, searchText } =
    filters;

  let filteredData = filterBySearch(searchText, allProducts);
  filteredData = filterByCategory(gender, filteredData);
  filteredData = filterByPriceRange(priceRange, filteredData);
  filteredData = filterByCheckbox(categories, filteredData);
  filteredData = sortByPrice(sortBy, filteredData);

  return filteredData;
};

export { useFilter };
