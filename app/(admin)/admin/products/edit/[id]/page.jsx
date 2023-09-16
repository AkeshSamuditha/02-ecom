import ProductForm from "@app/components/admin/ProductForm";
import React from "react";
import { getProduct, getcategories } from "@app/actions/serverActions";

const EditProduct = async ({ params: { id } }) => {
  const categories = await getcategories();
  const product = await getProduct(id);

  return (
    <ProductForm
      categories={categories}
      id={product.id}
      name={product.name}
      description={product.description}
      price={product.price}
      quantity={product.quantity}
      image={product.image}
      category={product.category}
      isFeatured={product.isfeatured}
    />
  );
};

export default EditProduct;
