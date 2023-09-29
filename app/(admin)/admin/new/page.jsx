import { getcategories } from "@app/actions/serverActions";
import ProductForm from "@app/components/admin/ProductForm";

const NewProduct = async () => {
  const categories = await getcategories();
  return <ProductForm categories={categories} />;
};

export default NewProduct;
