"use client";
import { useState } from "react";
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
  };

  return (
    <form
      action={onSubmit}
      className="mx-auto max-w-xl flex-row space-y-4 rounded-lg bg-gray-100 p-4 shadow-md"
    >
      <label className="text-primary block text-center text-xl font-semibold">
        Product Details
      </label>

      <div className="flex flex-col space-y-2">
        <input
          type="text"
          name="name"
          defaultValue={existingname}
          placeholder="Product name"
          required
          className="focus:border-primary rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <textarea
          type="text"
          name="description"
          defaultValue={existingDescription}
          placeholder="Description"
          required
          className="focus:border-primary rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring"
        />
      </div>

      <select
        name="category"
        defaultValue={assignedCategory}
        required
        className="focus:border-primary rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring"
      >
        <option value="" className="text-gray-400">
          Select a Category
        </option>
        {categories.length > 0 &&
          categories.map((category) => (
            <option
              key={category.id}
              value={category.name}
              className="hover:bg-primary text-gray-900 hover:text-white"
            >
              {category.name}
            </option>
          ))}
      </select>

      <div className="flex flex-col space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {image ? (
            <div className="relative rounded-md border border-gray-200 p-2 shadow-sm">
              <Image
                width={300}
                height={450}
                src={image}
                alt=""
                className="rounded-md"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute right-0 top-0 m-1 cursor-pointer rounded-full bg-red-500 p-1 text-xs text-white"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ) : (
            <label className="text-primary border-primary flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border bg-white text-center text-sm shadow-sm hover:bg-slate-200">
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

      <div className="itemcenter flex flex-row space-x-2">
        <label htmlFor="price" className="text-center text-gray-600">
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
          className="focus:border-primary max-w-md rounded-lg  border border-gray-300 px-2 py-1 focus:outline-none focus:ring"
          min="0"
        />
      </div>

      <div className="flex flex-row items-center justify-start ">
        <label htmlFor="quantity" className="mr-3 text-center text-gray-600">
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
          className="focus:border-primary max-w-xs rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring"
          min="0"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="isFeatured" className="text-lg  text-gray-700">
          Featured
        </label>
        <input
          type="checkbox"
          name="isFeatured"
          defaultChecked={existingIsFeatured}
          className="text-primary focus:ring-primary h-5 w-5 cursor-pointer rounded-md border-gray-300 accent-orange-800"
        />
      </div>
      <div className="flex justify-center space-y-2">
        <SubmitButton />
      </div>
    </form>
  );
}

// submit button is extracted out to seperate component to facilitate the handling of useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();
  const router = useRouter();
  return (
    <>
      {pending ? (
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin cursor-none justify-center text-xl "
        />
      ) : (
        <div className="flex">
          <div className="btn-rounded-secondary mr-2 w-auto  cursor-pointer font-bold">
            <button disabled={pending}>Submit</button>
          </div>
          <div>
            <button
              disabled={pending}
              onClick={() => router.back()}
              className="btn-rounded-secondary cursor-pointer rounded-full px-4 py-2 font-bold focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
