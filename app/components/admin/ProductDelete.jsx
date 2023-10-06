"use client";

import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { deleteProduct } from "@app/actions/serverActions";
import Image from "next/image";


//used a modal to delete the product
const ProductDelete = (product) => {
  const modalStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    padding: "20px",
    zIndex: "1000",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    maxWidth: "80%",
    item: "center",
    display: "flex",
  };

  const overlayStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: "999",
    backdropFilter: "blur(5px)", // Adjust the blur amount as needed
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="text-center cursor-pointer"
      onClick={() => setIsModalOpen(!isModalOpen)}
    >
      <FontAwesomeIcon icon={faTrash} className="text-sm text-red-700 hover:text-red-600" />
      {isModalOpen && (
        <>
          <div
            style={overlayStyles}
            onClick={() => setIsModalOpen(!isModalOpen)}
          ></div>
          <div
            style={modalStyles}
            className="flex-row items-center justify-center cursor-default"
          >
            <div>
              <Image
                height={280}
                width={200}
                src={product.image}
                alt={product.name}
                className="w-max h-max object-cover rounded-md mr-4 "
              />
            </div>
            <div className="text-center item-between">
              <h1>Do you want keep {product.name}?</h1>
              <div className="flex justify-center mt-4">
                <button
                  className="btn btn-red mr-2 rounded-lg hover:shadow-md px-5"
                  onClick={() => deleteProduct(product.id)}
                >
                  <FontAwesomeIcon className=" text-green-700"
                    icon={faCircleCheck}/>
                    <span className="ml-2">Yes</span>
                </button>
                <button className="btn btn-default px-5 rounded-lg hover:shadow-md"
                 onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-red-700"
                  />
                  <span className="ml-2">
                  NO
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDelete;
