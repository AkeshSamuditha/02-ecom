"use server";

import prisma from "@app/lib/prisma";
import uploadFile from "@app/utils/imageKitUploader";
import { revalidatePath } from "next/cache";

export async function getProduct(id) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    return product;
  } catch (err) {
    return new Error({ message: "Something went wrong!" });
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    // return products;
    const sortedProducts = products.sort((a, b) => {
      const dateA = new Date(a.lastupdate);
      const dateB = new Date(b.lastupdate);

      // Compare the Date objects
      return dateB - dateA;
    });
    return sortedProducts;
  } catch (err) {
    console.log(err);
    throw new Error({ message: "Something went wrong!" });
  }
}

export async function getcategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (err) {
    return new Error({ message: "Something went wrong!" });
  }
}

export async function createProduct(data) {
  try {
    //upload the image to the imagekit server
    const res = await uploadFile(data.get("name"), data.get("image"));
    if (!res) {
      return;
    }

    //get the image name created
    const imageName = res.name;
    const isFeatured = data.get("isFeatured") === "on" ? true : false;
    const price = parseFloat(data.get("price"));
    const quantity = parseInt(data.get("quantity"));

    const product = await prisma.product.create({
      data: {
        name: data.get("name"),
        description: data.get("description"),
        price: price,
        quantity: quantity,
        image: imageName,
        category: data.get("category"),
        isfeatured: isFeatured,
      },
    });
    revalidatePath("/admin/products");
    return product;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function updateProduct(data) {
  try {
    if (data.get("imageChanged") === true) {
      const res = await uploadFile(data.get("name"), data.get("image"));
      if (!res) {
        return "Something went wrong!";
      }

      data.set("image", res.name);
    }

    const isFeatured = data.get("isFeatured") === "on" ? true : false;
    const price = parseFloat(data.get("price"));
    const quantity = parseInt(data.get("quantity"));

    const product = await prisma.product.update({
      where: {
        id: data.get("id"),
      },
      data: {
        name: data.get("name"),
        description: data.get("description"),
        price: price,
        quantity: quantity,
        image: data.get("image"),
        category: data.get("category"),
        isfeatured: isFeatured,
      },
    });
    revalidatePath("/admin/products");
    return product;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function deleteProduct(id) {
  try {
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/admin/products");
    return product;

    //have to implement the method to delete picture from imagekit server
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany();
    return orders;
  } catch (err) {
    console.log(err);
    return;
  }
}
