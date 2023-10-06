import Image from "next/image";
import Link from "next/link";

import { getProducts } from "@app/actions/serverActions";

function selectRandomProducts(array, count) {
  const shuffled = array.slice();
  let currentIndex = shuffled.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex > 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }

  // Return the first 'count' elements of the shuffled array
  return shuffled.slice(0, count);
}

const RandomProducts = async () => {
  const allProducts = await getProducts();
  const randomProducts = selectRandomProducts(allProducts, 5);
  return (
    <section className="mb-4 mt-3 p-4">
      <h2 className="relative mb-4 text-center text-3xl font-semibold">
        Searching for More?
        <span className="absolute bottom-0 left-1/2 h-1 w-16 -translate-x-1/2 transform bg-orange-600 "></span>
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {randomProducts.map((product) => (
          <div
            key={product.id}
            className="flex  flex-col items-center justify-between rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={600}
                className="h-400 w-full max-w-full rounded-xl sm:w-auto"
              />
            </Link>
            <div className="p-4 text-center">
              <h3 className="text-md font-semibold leading-tight">
                {product.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RandomProducts;
