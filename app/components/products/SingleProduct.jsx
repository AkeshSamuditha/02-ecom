import Image from "next/image";
import Link from "next/link";
import CartButton from "../buttons/cartButton";


// Single Product Component at the explore page
const SingleProduct = ({ product }) => {
  return (
    <>
      <div
        className="flex flex-col xs:flex-row sm:flex-col  bg-white/[0.5] rounded-lg shadow-md border-2 border-black/[0.05] overflow-hidden
      cursor-pointer
      transition-transform
      hover:scale-[1.02] hover:shadow-lg"
      >
        <Link href={`/products/${product.id}`}>
        <div
          className="flex items-center justify-center xs:p-5  bg-black/[0.075]  xs:w-1/2 w-full sm:w-full"
        >
          <Image
            src={product.image}
            alt="Product Image"
            width={150}
            height={200}
            className="w-full h-full object-cover xs:object-contain sm:object-contain"
            />
        </div>
            </Link>

        <div className="p-3 flex flex-col gap-2 mt-2 h-1/2 xs:h-full sm:h-1/2 xs:w-2/3 w-full sm:w-full">
            <div>
              <div className=" flex justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-medium">{product.name}</span>
                  <span className="flex items-center gap-1">
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-lg text-gray-600 font-cabin">
                    Rs. {product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          <div className="w-full pt-2 border-t flex justify-center items-center">
            <CartButton product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
