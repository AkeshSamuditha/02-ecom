"use client";
import React from "react";
import Image from "next/image";
import { getProduct } from "@app/actions/serverActions";
import { useEffect, useState } from "react";
import { notify } from "@app/utils/notify";
import { notifyTypes } from "@app/utils/actiontypes";

const ItemCard = ({ product }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productInInventory = await getProduct(product.id);
        setItem({
          id: product.id,
          name: productInInventory.name,
          image: productInInventory.image,
          price: productInInventory.price,
          quantity: product.quantity,
        });
      } catch (error) {
        notify(notifyTypes.ERROR, error.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  if (!item) {
    // You can render a loading indicator or handle the loading state here
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-col gap-2 shadow-sm px-4 py-2 rounded-sm "
      key={item.id}
    >
      <div className="flex  items-center flex-wrap gap-2 w-full">
        <div className="flex flex-1 items-center gap-2">
          <div className=" bg-black/[0.075] h-16 w-16 rounded-md flex items-center">
            <Image
              src={item.image}
              alt=""
              className="object-fit w-full"
              width={100}
              height={100}
            />
          </div>
          <div className="">
            <h2>{item.name}</h2>
            <span className="text-md text-gray-500">Rs. {item.price}</span>
            {/* <span className="text-sm text-gray-500 line-through px-2">
              Rs. {item.price}
            </span> */}
          </div>
        </div>
        <div className="text-lg">x{item.quantity}</div>
      </div>
    </div>
  );
};

export default ItemCard;
