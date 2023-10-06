import Image from "next/image";
import Link from "next/link";
import CartButton from "../buttons/cartButton";

// Single Product Component at the explore page
const SingleProduct = ({ product }) => {
  return (
    <>
      <div
        className="xs:flex-row flex cursor-pointer flex-col  overflow-hidden rounded-lg border-2 border-black/[0.05] bg-white/[0.5] shadow-md
      transition-transform
      hover:scale-[1.02]
      hover:shadow-lg sm:flex-col"
      >
        <Link href={`/products/${product.id}`}>
          <div className="xs:p-5 xs:w-1/2 flex w-full  items-center  justify-center bg-black/[0.075] sm:w-full">
            <Image
              src={product.image}
              alt="Product Image"
              width={150}
              height={200}
              className="xs:object-contain h-full w-full object-cover sm:object-contain"
            />
          </div>
        </Link>

        <div className="xs:h-full xs:w-2/3 mt-2 flex h-1/2 w-full flex-col gap-2 p-3 sm:h-1/2 sm:w-full">
          <div>
            <div className=" flex justify-between">
              <div className="flex flex-col">
                <span className="text-xl font-medium">{product.name}</span>
                <span className="flex items-center gap-1"></span>
              </div>

              <div className="flex flex-col items-end">
                <span className="font-cabin text-lg text-gray-600">
                  Rs. {product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center border-t pt-2">
            <CartButton product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
