"use client";

import { createContext, useContext } from "react";
import ProductsContext from "../components/providers/productsProvider";
import CartContext from "../components/providers/cartProvider";

export const useProductsContext = () => useContext(ProductsContext);
export const useCartContext = () => useContext(CartContext);
