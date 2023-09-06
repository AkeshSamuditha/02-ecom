import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

import { getProduct } from "@app/actions/serverActions";
import CartButton from "@app/components/buttons/cartButton";

export default async function ProductDetails({ params: { id } }) {
  console.log("I am at checkoutpage", id);
  const product = await getProduct(id);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-20">
      <main className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 max-w-screen-xl">
        <section className=" rounded-lg shadow-md flex items-center justify-center">
          <Image
            src={product.image}
            alt="Sample image"
            width={400}
            height={600}
            className="rounded-xl w-full h-full object-cover transition-transform hover:scale-110"
          />
        </section>
        <section className="p-8 bg-white bg-opacity-70 rounded-md shadow-md flex flex-col gap-2 justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-center uppercase tracking-wide">
              {product?.name}
            </h1>

            <br />
            <h2 className="text-2xl font-semibold text-left">
              <span className="hover:scale-95 underline transition">
                About Product
              </span>
            </h2>
            <p className="text-gray-600 text-xl">{product?.description}</p>
          </div>
          <ul className="flex flex-col items-left">
            <li className="text-gray-500 text-lg items-left">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              {product?.category}
            </li>
          </ul>
          <div className="flex items-center pb-4 pt-4 sm:pb-0">
            <span className="text-2xl font-semibold text-amber-600">
              Rs. {product?.price}
            </span>
          </div>
          <div className="w-full flex-col flex items-center mt-4 justify-center">
            <CartButton product={product} />
          </div>
        </section>
      </main>
    </div>
  );
}
