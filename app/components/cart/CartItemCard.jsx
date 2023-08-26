import React from "react";
import Image from "next/image";
import imageKitLoader from "../../utils/imageKitLoader";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsBookmarkHeart, BsFillBookmarkHeartFill } from "react-icons/bs";
import {
  useCartContext,
  useProductsContext,
  //   useWishlistContext,
} from "../../contexts";
import { useRouter } from "next/navigation";

const CartItemCard = ({ product, productinInventory, isSearch, setSearch }) => {
  const navigate = useRouter();
  const { getProductById } = useProductsContext();
  const productInInventory = getProductById(product.id);
  // const isInWish  = true
  // const { isInWish } = useProductsContext();
  const { updateProductQtyInCart, deleteProductFromCart, disableCart } =
    useCartContext();
  // const { addProductToWishlist, deleteProductFromWishlist, disableWish } =
  //   useWishlistContext();

  const updateHandler = (type) => {
    if (
      type === "increment" &&
      productInInventory.quantity > product.quantity
    ) {
      updateProductQtyInCart(product.id, type);
    } else if (product.quantity > 1) {
      updateProductQtyInCart(product.id, type);
    } else {
      deleteProductFromCart(product.id);
    }
  };
  // const inWish = isInWish(product.id);
  return (
    <div
      className={`m-auto flex flex-col gap-2  p-4 rounded-sm shadow-sm bg-white/[0.6] mb-2 max-w-xl ${
        isSearch ? "cursor-pointer hover:bg-black/5" : ""
      }`}
      onClick={() => {
        if (isSearch) {
          setSearch("");
          navigate.push(`product/${product.id}`);
        }
      }}
    >
      <div className="flex  items-center flex-wrap gap-2 w-full">
        <div className="flex flex-wrap xs:flex-nowrap justify-center xs:justify-start flex-1 items-center gap-5">
          <div
            className={` bg-black/[0.075] ${
              isSearch ? "h-14 w-14 " : "h-28 w-28"
            } rounded-md flex items-center`}
          >
            <Image
              loader={imageKitLoader}
              src={productInInventory.image}
              alt="Sample image"
              width={200}
              height={200}
              className="object-fit:contain"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-xl py-3 font-semibold">{product.name}</h2>

            {!isSearch && (
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <span className="text-gray-700">Quantity: </span>
                  <button
                    className="bg-[--primary-text-color] p-1 text-gray-100 rounded-md  text-xs disabled:cursor-not-allowed"
                    disabled={disableCart}
                    onClick={() => updateHandler("decrement")}
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="h-full w-10 bg-black/[0.075]  rounded-sm flex items-center justify-center">
                    {product.quantity}
                  </span>
                  <button
                    className="bg-[--primary-text-color] p-1 text-gray-100 rounded-md text-xs disabled:cursor-not-allowed"
                    disabled={disableCart}
                    onClick={() => updateHandler("increment")}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className="flex gap-1 sm:gap-3  ">
                  <button
                    className="btn-rounded-secondary  text-xs sm:text-sm mt-2 max-w-xs disabled:cursor-not-allowed"
                    disabled={disableCart}
                    onClick={() => deleteProductFromCart(product.id)}
                  >
                    Remove from Cart
                  </button>
                  {/* <button
                    className="disabled:cursor-not-allowed"
                    disabled={disableWish}
                    // onClick={() => {
                    //   if (inWish) {
                    //     deleteProductFromWishlist(product.id);
                    //   } else {
                    //     addProductToWishlist(product);
                    //   }
                    // }}
                  >
                    {inWish ? (
                      <BsFillBookmarkHeartFill className="text-xl text-rose-600 hover:shadow-md transition" />
                    ) : (
                      <BsBookmarkHeart className="text-xl hover:text-rose-600 hover:shadow-md transition" />
                    )}
                  </button> */}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span>Rs.{product.price}</span>
          {/* <span className="text-xs line-through text-gray-600">
            Rs. {product.price}
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
