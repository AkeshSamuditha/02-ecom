"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCloudUploadAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import { createProduct, updateProduct } from "@app/actions/serverActions";

export default function ProductForm({
  categories: categories,
  id: existingid,
  name: existingname,
  description: existingDescription,
  price: existingPrice,
  quantity: existingQuantity,
  image: existingimage,
  category: assignedCategory,
  isFeatured: existingIsFeatured,
}) {
  const [price, setPrice] = useState(existingPrice || "");
  const [quantity, setQuantity] = useState(existingQuantity || "");

  const [image, setImage] = useState(existingimage || null);
  const [imageFile, setImageFile] = useState(null);

  const router = useRouter();

  async function onSubmit(data) {
    //imageFile is null if the image is not changed.
    if (imageFile) {
      data.append("imageChanged", true); //tell server that the image is changed
      data.append("image", imageFile);
    } else {
      data.append("imageChanged", false);
      data.append("image", image);
    }

    data.append("id", existingid);

    if (existingid) {
      const response = await updateProduct(data);

      if (!response) {
        return;
      }
    } else {
      const response = await createProduct(data);
      if (!response) {
        return;
      }
    }
    router.push("/admin/products");
  }

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadimage = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    //image is the preview of the image
    setImage(URL.createObjectURL(file));
    //imageFile is the actual file that is send to the server
    const base64 = await toBase64(file);
    setImageFile(base64);
    console.log("image changed", imageFile);
  };

  return (
    <form
      action={onSubmit}
      className="flex-row max-w-xl mx-auto p-4 space-y-4 bg-gray-100 rounded-lg shadow-md"
    >
      <label className="block text-xl text-center font-semibold text-primary">
        Product Details
      </label>

      <div className="flex flex-col space-y-2">
        <input
          type="text"
          name="name"
          defaultValue={existingname}
          placeholder="Product name"
          required
          className="rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-primary"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <textarea
          type="text"
          name="description"
          defaultValue={existingDescription}
          placeholder="Description"
          required
          className="rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-primary"
        />
      </div>

      <select
        name="category"
        defaultValue={assignedCategory}
        required
        className="rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-primary text-gray-700"
      >
        <option value="" className="text-gray-400">
          Select a Category
        </option>
        {categories.length > 0 &&
          categories.map((category) => (
            <option
              key={category.id}
              value={category.name}
              className="text-gray-900 hover:bg-primary hover:text-white"
            >
              {category.name}
            </option>
          ))}
      </select>

      <div className="flex flex-col space-y-2">
        <div className="flex flex-wrap gap-2 items-center">
          {image ? (
            <div className="relative p-2 rounded-md shadow-sm border border-gray-200">
              <Image
                width={300}
                height={450}
                src={image}
                alt=""
                className="rounded-md"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-0 right-0 p-1 m-1 bg-red-500 text-white rounded-full text-xs cursor-pointer"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ) : (
            <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm text-primary rounded-md bg-white shadow-sm border border-primary hover:bg-slate-200">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="text-2xl" />
              <div>Add Image</div>
              <input
                type="file"
                name="image"
                onChange={uploadimage}
                className="hidden"
                accept="image/*"
                required
              />
            </label>
          )}
        </div>
      </div>

      <div className="flex flex-row itemcenter space-x-2">
        <label htmlFor="price" className="text-gray-600 text-center">
          Price (in LKR):
        </label>
        <input
          type="text"
          name="price"
          placeholder="1799"
          value={price}
          required
          onChange={(ev) => {
            // checking if the entered value is a float
            const newValue = ev.target.value;

            if (/^\d*\.?\d*$/.test(newValue)) {
              setPrice(newValue);
            } else {
              setPrice(0);
            }
          }}
          className="rounded-lg px-2 py-1  max-w-md border border-gray-300 focus:outline-none focus:ring focus:border-primary"
          min="0"
        />
      </div>

      <div className="flex flex-row items-center justify-start ">
        <label htmlFor="quantity" className="text-gray-600 text-center mr-3">
          Quantity:
        </label>
        <input
          type="number"
          name="quantity"
          placeholder="0"
          value={quantity}
          onChange={(ev) => {
            const newValue = Math.max(0, ev.target.value); // Ensure non-negative value
            setQuantity(newValue);
          }}
          className="rounded-lg px-2 py-1 max-w-xs border border-gray-300 focus:outline-none focus:ring focus:border-primary"
          min="0"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="isFeatured" className="text-gray-700  text-lg">
          Featured
        </label>
        <input
          type="checkbox"
          name="isFeatured"
          defaultChecked={existingIsFeatured}
          className="text-primary h-5 w-5 focus:ring-primary border-gray-300 rounded-md cursor-pointer accent-orange-800"
        />
      </div>
      <div className="flex justify-center space-y-2">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  const router = useRouter();
  return (
    <>
      {pending ? (
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-xl cursor-none justify-center "
        />
      ) : (
        <div className="flex">
          <div className="btn-rounded-secondary cursor-pointer font-bold  w-auto mr-2">
            <button disabled={pending}>Submit</button>
          </div>
          <div>
            <button
              disabled={pending}
              onClick={() => router.back()}
              className="btn-rounded-secondary font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
