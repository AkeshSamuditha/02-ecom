import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

import { getProduct, getProducts } from "@app/actions/serverActions";
import CartButton from "@app/components/buttons/cartButton";
import RandomProducts from "@app/components/products/RandomProducts";

export default async function ProductDetails({ params: { id } }) {
  const product = await getProduct(id);

  return (
    <>
      <div className="flex items-center justify-center p-4">
        <main className="grid max-w-screen-xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16">
          <section className=" flex  items-center justify-center rounded-lg">
            <Image
              src={product.image}
              alt="Sample image"
              width={400}
              height={600}
              className="h-full w-full rounded-xl object-cover transition-transform hover:scale-110"
            />
          </section>
          <section className="flex flex-col  justify-center gap-2 rounded-md p-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-center text-4xl font-bold uppercase tracking-wide sm:text-4xl lg:text-5xl">
                {product?.name}
              </h1>

              <br />
              <h2 className="text-left text-2xl font-semibold">
                <span className="underline transition hover:scale-95">
                  About Product
                </span>
              </h2>
              <p className="text-xl text-gray-600">{product?.description}</p>
            </div>
            <ul className="items-left flex flex-col">
              <li className="items-left text-lg text-gray-500">
                <FontAwesomeIcon icon={faTag} className="mr-2" />
                {product?.category}
              </li>
            </ul>
            <div className="flex items-center pb-4 pt-4 sm:pb-0">
              <span className="text-2xl font-semibold text-amber-600">
                Rs. {product?.price}
              </span>
            </div>
            <div className="mt-4 flex w-full flex-col items-center justify-center">
              <CartButton product={product} />
            </div>
          </section>
        </main>
      </div>
      <br />
      <RandomProducts />
    </>
  );
}
