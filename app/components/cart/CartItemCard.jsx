import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { useCartContext } from "@app/contexts/index";
import { notify } from "@app/utils/notify";
import { notifyTypes } from "@app/utils/actiontypes";

const CartItemCard = ({ product, isSearch, setSearch }) => {
  const navigate = useRouter();

  const { updateProductQtyInCart, deleteProductFromCart, disableCart } =
    useCartContext();

  return (
    <div
      className={`m-auto flex flex-col gap-2 p-4 rounded-lg shadow-lg bg-white/[0.6] mb-2 max-w-lg ${
        isSearch ? "cursor-pointer hover:bg-black/5" : ""
      }`}
      onClick={() => {
        if (isSearch) {
          setSearch("");
          navigate.push(`product/${product.id}`);
        }
      }}
    >
      <div className="flex items-center flex-wrap gap-2 w-full  justify-center">
        <div className="flex flex-wrap xs:justify-between justify-center gap-4 flex-1 items-center ">
          <div
            className={` bg-black/[0.075] ${
              isSearch ? "h-14 w-14 " : "h-28 w-28"
            } rounded-md flex items-center`}
          >
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt="Sample image"
                width={200}
                height={200}
                className="object-fit:contain"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-xl py-3 font-semibold">{product.name}</h2>

            {!isSearch && (
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <span className="text-gray-700">Quantity: </span>
                  <button
                    className="bg-[--primary-text-color] p-1 text-gray-100 rounded-md  text-xs disabled:cursor-not-allowed"
                    disabled={disableCart}
                    onClick={() => {
                      const response = updateProductQtyInCart(
                        product.id,
                        "decrement"
                      );

                      if (response.message) {
                        notify(notifyTypes.ERROR, "Product is out of stock");
                      }
                    }}
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="h-full w-10 bg-black/[0.075]  rounded-sm flex items-center justify-center">
                    {product.quantity}
                  </span>
                  <button
                    className="bg-[--primary-text-color] p-1 text-gray-100 rounded-md text-xs disabled:cursor-not-allowed"
                    disabled={disableCart}
                    onClick={() => {
                      const response = updateProductQtyInCart(
                        product.id,
                        "increment"
                      );

                      if (response.message) {
                        notify("error", "Product is out of stock");
                      }
                    }}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className="flex gap-1 justify-center sm:gap-3   ">
                  <button
                    className="btn-rounded-secondary bg-gradient-to-r from-red-400 to-red-500 text-white text-xs sm:text-sm mt-2 max-w-xs border-none disabled:cursor-not-allowed font-bold "
                    disabled={disableCart}
                    onClick={() => {
                      deleteProductFromCart(product.id);
                      notify(notifyTypes.SUCCESS, "Product removed from cart");
                    }}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-end px-6 font-cabin">
            <span>Rs. {product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
