"use client";
import { usePathname, useRouter, useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
  // const [product, setProduct] = useState(null);
  // useEffect(() => {
  //   console.log(productId);
  //   const getProduct = async () => {
  //     try {
  //       const response = await fetch(`/api/products/${productId}`, {
  //         method: "GET",
  //       });
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const product = await response.json();
  //       console.log(product);
  //       setProduct(product);
  //       return;
  //     } catch (error) {
  //       return new Error(error);
  //     }
  //   };
  //   getProduct();
  // }, [productId]);

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-8 bg-gray-100">
      <main className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 max-w-screen-xl">
        <section className="p-6 sm:p-8 rounded-lg shadow-md flex items-center justify-center b">
          <Image
            loader={imageKitLoader}
            src={product.image}
            alt="Sample image"
            width={400}
            height={600}
            className="rounded-xl w-full h-full object-cover transition-transform hover:scale-110"
          />
        </section>
        <section className="p-6 sm:p-8 bg-white bg-opacity-70 rounded-md shadow-md flex flex-col gap-6 justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-center  uppercase tracking-wide">
              {product?.name}
            </h1>
            <br />
            <h2 className="text-xl sm:text-2xl font-semibold text-left relative">
              <span className="hover:scale-95 underline transition">
                About Product
              </span>
            </h2>
            <p className="text-gray-600 text-xl ">{product?.description}</p>
          </div>
          <ul className="flex flex-col gap-2 items-left">
            <li className="text-gray-500 text-lg flex items-left">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              {product?.category}
            </li>
          </ul>
          <div className="flex items-center pb-4 sm:pb-0">
            <span className="text-xl sm:text-2xl font-semibold text-amber-600">
              Rs. {product?.price}
            </span>
          </div>
          <div className="w-full flex-col flex items-center justify-center">
            <button
              disabled={disableCart}
              className="btn-rounded-secondary flex items-center justify-center gap-2 text-base
             hover:bg-amber-600 hover:text-white hover:scale-105 transform transition disabled:cursor-not-allowed"
              onClick={() => {
                if (!token) {
                  navigate.push("/login", { state: { from: location } });
                  // notify("warn", "Please Login to continue");
                } else if (!product?.inCart) {
                  addProductToCart(product);
                } else {
                  navigate.push("/cart");
                }
              }}
            >
              <div className="animate-pulse">
                <HiOutlineShoppingBag className="text-xl" />
              </div>
              {product?.inCart ? "Go to Cart" : "Add to Cart"}
            </button>
            {product?.inCart && (
              <div className="text-sm text-center  text-red-500 px-2 py-1">
                Already added to cart
              </div>
            )}
          </div>

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
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;
