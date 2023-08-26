"use client";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsBookmarkHeart, BsFillBookmarkHeartFill } from "react-icons/bs";
import Image from "next/image";
import imageKitLoader from "../../../utils/imageKitLoader";
import {
  // useAuthContext,
  useCartContext,
  useProductsContext,
  // useWishlistContext,
} from "../../../contexts";
// import { getProductByIdService } from "../api/apiServices";
// import { StarRating } from "../components";
// import { notify } from "../utils/utils";

const ProductDetails = () => {
  const navigate = useRouter();
  const location = usePathname();
  const productId = useParams();
  const { data: token } = useSession();
  const { getProductById, allProducts } = useProductsContext();
  const { addProductToCart, disableCart } = useCartContext();
  // const { addProductToWishlist, deleteProductFromWishlist, disableWish } =
  //   useWishlistContext();
  // const [loading, setLoading] = useState(false);
  const product = getProductById(productId.id);
  // useEffect(() => {

  //   (async () => {
  //     setLoading(true);
  //     try {
  //       const response = await getProductByIdService(productId);
  //       // console.log(response);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [allProducts, productId]);

  return (
    <div className="md:min-h-[80vh] flex justify-center items-center pt-5 sm:pt-3 pb-2 relative">
      <main className="grid grid-rows-1 sm:grid-cols-2 gap-2 sm:gap-10 ">
        <section className="relative p-7  flex items-center justify-center rounded-lg">
          <Image
            loader={imageKitLoader}
            src={product.image}
            alt="Sample image"
            width={400}
            height={600}
            className="rounded-xl w-full h-full object-cover xs:object-contain sm:object-contain "
          />
        </section>

        <section className="p-7 px-10 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-3 sm:gap-5 ">
          <div className="flex flex-col gap-2">
            <h1 className=" text-2xl sm:text-4xl font-bold">{product?.name}</h1>
            <p className=" text-gray-600 text-sm sm:text-base">
              {product?.description}
            </p>
            {/* <div className="flex items-center gap-1">
              { <StarRating /> }

              <span className="text-xs text-gray-400">
                ({product?.rating}) Rating
              </span>
            </div> */}
          </div>

          <div className="flex flex-col gap-2">
            {/* <h2 className="text-lg font-semibold">About Product</h2> */}
            <ul className="flex gap-5  flex-row">
              <div>
                {/* <li>
                  <span className="text-gray-500 text-sm">Brand: </span>
                  {product?.brand}
                </li> */}
                <li>
                  <span className="text-gray-500 text-sm">Category: </span>
                  {product?.category}
                </li>

                <li>
                  <div className="flex">
                    <span className="text-gray-500 text-sm">Colors: </span>
                    {/* {product?.weight ? ( */}
                    {true ? (
                      <div className="flex items-center">
                        {/* {product.weight.map((color, index) => ( */}
                        {["#FF5733", "#33FFA0", "#3360FF"].map(
                          (color, index) => (
                            <div
                              key={index}
                              style={{
                                backgroundColor: color,
                                width: "16px",
                                height: "16px",
                                borderRadius: "50%",
                                margin: "0 5px",
                              }}
                            ></div>
                          )
                        )}
                      </div>
                    ) : (
                      <span>No colors available</span>
                    )}
                  </div>
                </li>
              </div>
            </ul>
          </div>

          <div className="flex gap-2 items-center pb-10 sm:pb-0">
            Price:
            <span className="ms-1 text-xl sm:text-xl text-amber-600">
              Rs. {product?.price}
            </span>
            {/* <span className="text-sm text-gray-600 line-through">
              Rs{product?.price}
            </span> */}
          </div>

          <div className={`w-full   flex gap-4 items-center   flex-wrap  `}>
            <button
              className="btn-rounded-secondary flex items-center gap-2 text-sm disabled:cursor-not-allowed"
              disabled={disableCart}
              onClick={() => {
                if (!token) {
                  navigate.push("/login", { state: { from: location } });
                  notify("warn", "Please Login to continue");
                } else {
                  if (!product?.inCart) {
                    addProductToCart(product);
                  } else {
                    navigate.push("/cart");
                  }
                }
              }}
            >
              <HiOutlineShoppingBag />{" "}
              {product?.inCart ? "Go to Cart" : "Add to Cart"}
            </button>

            {/* <button
              className="btn-rounded-primary rounded-full flex items-center gap-2 text-sm disabled:cursor-not-allowed"
              disabled={disableWish}
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
            > */}
            {/* {product?.inWish ? (
                <>
                  <BsFillBookmarkHeartFill />
                  <span>Remove from Wishlist</span>
                </>
              ) : (
                <>
                  {" "}
                  <BsBookmarkHeart /> <span>Wishlist Item</span>
                </>
              )}{" "} */}
            {/* </button> */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;
