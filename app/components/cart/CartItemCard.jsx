import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { useCartContext } from "@app/contexts/index";
import { notify } from "@app/utils/notify";

const CartItemCard = ({ product, isSearch, setSearch }) => {
  const navigate = useRouter();

  const { updateProductQtyInCart, deleteProductFromCart, disableCart } =
    useCartContext();

  return (
    <div
      className={`m-auto mb-2 flex max-w-lg flex-col gap-2 rounded-lg bg-white/[0.6] p-4 shadow-lg ${
        isSearch ? "cursor-pointer hover:bg-black/5" : ""
      }`}
      onClick={() => {
        if (isSearch) {
          setSearch("");
          navigate.push(`product/${product.id}`);
        }
      }}
    >
      <div className="flex w-full flex-wrap items-center justify-center  gap-2">
        <div className="xs:justify-between flex flex-1 flex-wrap items-center justify-center gap-4 ">
          <div
            className={` bg-black/[0.075] ${
              isSearch ? "h-14 w-14 " : "h-28 w-28"
            } flex items-center rounded-md`}
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
            <h2 className="py-3 text-xl font-semibold">{product.name}</h2>

            {!isSearch && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Quantity: </span>
                  <button
                    className="rounded-md bg-[--primary-text-color] p-1 text-xs  text-gray-100 disabled:cursor-not-allowed"
                    disabled={disableCart}
                    onClick={() => {
                      const response = updateProductQtyInCart(
                        product.id,
                        "decrement",
                      );
                      if (response.message) {
                        notify("error", "Product is out of stock");
                      }
                    }}
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="flex h-full w-10  items-center justify-center rounded-sm bg-black/[0.075]">
                    {product.quantity}
                  </span>
                  <button
                    className="rounded-md bg-[--primary-text-color] p-1 text-xs text-gray-100 disabled:cursor-not-allowed"
                    disabled={disableCart}
                    onClick={() => {
                      const response = updateProductQtyInCart(
                        product.id,
                        "increment",
                      );
                      if (response.message) {
                        notify("error", "Product is out of stock");
                      }
                    }}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className="flex justify-center gap-1 sm:gap-3   ">
                  <button
                    className="btn-rounded-secondary mt-2 max-w-xs border-none bg-gradient-to-r from-red-400 to-red-500 text-xs font-bold text-white disabled:cursor-not-allowed sm:text-sm "
                    disabled={disableCart}
                    onClick={() => deleteProductFromCart(product.id)}
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
