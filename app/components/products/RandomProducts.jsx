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
    <section className="mt-3 mb-4 p-4">
  <h2 className="text-3xl font-semibold mb-4 text-center relative">
    Searching for More?
    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-orange-600 "></span>
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {randomProducts.map((product) => (
      <div key={product.id} className="rounded-lg  hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-between items-center">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={600}
          className="rounded-xl max-w-full w-full h-400 sm:w-auto"
        />
      </Link>
      <div className="p-4 text-center">
        <h3 className="text-md font-semibold leading-tight">{product.name}</h3>
      </div>
    </div>
    
    ))}
  </div>
</section>
  )
}

export default RandomProducts