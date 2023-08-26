import { NextResponse } from "next/server";

import prisma from "../../../lib/prisma";

export async function GET(request, { params }) {
  const cart = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(JSON.stringify(cart.cart), { status: 200 });
}

export async function PUT(request, { params }) {
  const body = await request.json();

  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: {
      cart: {
        push: {
          id: body.id,
          quantity: body.quantity,
          price: body.price,
        },
      },
    },
  });
  return NextResponse.json(JSON.stringify(updatedUser.cart), { status: 200 });
}

export async function PATCH(request, { params }) {
  const body = await request.json();
  const productId = body.id;
  const type = body.type;

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: { cart: true },
  });

  const updatedCart = user.cart.map((item) => {
    if (item.id === productId) {
      if (type === "increment") {
        console.log(item);
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return { ...item, quantity: item.quantity - 1 };
      }
    } else {
      return item;
    }
  });

  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: {
      cart: { set: updatedCart },
    },
  });
  return NextResponse.json(JSON.stringify(updatedUser.cart), { status: 200 });
}

export async function DELETE(request, { params }) {
  const body = await request.json();
  const productId = body;
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: { cart: true },
  });
  const updatedCart = user.cart.filter((item) => item.id !== productId);

  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: {
      cart: { set: updatedCart },
    },
  });
  return NextResponse.json(JSON.stringify(updatedUser.cart), { status: 200 });
}
