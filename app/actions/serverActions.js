"use server";

import prisma from "@app/lib/prisma";

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
    return products;
  } catch (err) {
    return new Error({ message: "Something went wrong!" });
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
