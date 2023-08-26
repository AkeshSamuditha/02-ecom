import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { GiRoundStar } from "react-icons/gi";
import Image from "next/image";
import { BsBookmarkHeart, BsFillBookmarkHeartFill } from "react-icons/bs";
import {
  // useAuthContext,
  useCartContext,
  useProductsContext,
  // useWishlistContext,
} from "../../contexts";
import Link from "next/link";

// import { useLocation } from "react-router";
// import { notify } from "../../utils/utils";

const SingleProduct = ({ product }) => {
  const location = usePathname();
  const token = useSession();
  const { isInCart } = useProductsContext();
  const { addProductToCart, disableCart } = useCartContext();
  // const { addProductToWishlist, deleteProductFromWishlist, disableWish } =
  //   useWishlistContext();
  const navigate = useRouter();
  let inCart = isInCart(product.id);

  return (
    <>
      <div
        className="flex flex-col xs:flex-row sm:flex-col  bg-white/[0.5] rounded-lg shadow-md border-2 border-black/[0.05] overflow-hidden
      cursor-pointer
      transition-transform
      hover:scale-[1.02] hover:shadow-lg"
      >
        <div
          // className="flex items-center justify-center p-10 xs:p-5 sm:p-10 bg-black/[0.075] h-1/2 xs:h-full sm:h-1/2 xs:w-1/2 w-full sm:w-full"
          className="flex items-center justify-center xs:p-5  bg-black/[0.075]  xs:w-1/2 w-full sm:w-full"
          onClick={() => {
            navigate.push(`/products/${product.id}`);
          }}
        >
          <Image
            src={product.image}
            alt="Sample image"
            width={150}
            height={200}
            className="w-full  h-full object-cover xs:object-contain sm:object-contain"
          />
        </div>

        <div className="p-3 flex flex-col justify-between gap-2 mt-2 h-1/2 xs:h-full sm:h-1/2 xs:w-2/3 w-full sm:w-full">
          <Link href={`/products/${product.id}`}>
            <div>
              <div className=" flex justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-medium">{product.name}</span>
                  <span className="flex items-center gap-1">
                    {/* <span>{product.rating}</span> */}

                    {/* <GiRoundStar className=" text-yellow-400 mb-1" /> */}
                    {/* <span className="text-xs text-gray-400">Rating</span> */}
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-600">
                    Rs. {product.price}
                  </span>
                </div>
              </div>
              {/* <p className="text-sm text-gray-600">{product.brand}</p> */}
            </div>
          </Link>
          <div className="w-full pt-2 border-t flex justify-center items-center">
            <button
              className={`border border-[--primary-text-color]  py-1.5 text-sm  rounded-full px-6 hover:bg-[--primary-text-color] hover:text-white transition hover:shadow-md disabled:cursor-not-allowed`}
              disabled={disableCart}
              onClick={() => {
                if (!token) {
                  navigate.push("/login");
                  // notify("warn", "Please Login to continue");
                } else {
                  if (!inCart) {
                    addProductToCart(product);
                  } else {
                    navigate.push("/cart");
                  }
                }
              }}
            >
              {inCart ? "Added to the Cart" : "Add to Cart"}
            </button>
            {/* <button
            disabled={false} //{disableWish}
            className="disabled:cursor-not-allowed"
            onClick={() => {
              if (!token) {
                navigate.push("/login", { state: { from: location.pathname } });
                notify("warn", "Please Login to continue");
              } else {
                if (product?.inWish) {
                  deleteProductFromWishlist(product.id);
                } else {
                  addProductToWishlist(product);
                }
              }
            }}
            >
            {product.inWish ? (
              <BsFillBookmarkHeartFill className="text-xl text-rose-600 hover:shadow-md transition" />
              ) : (
                <BsBookmarkHeart className="text-xl hover:text-rose-600 hover:shadow-md transition" />
                )}
              </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
