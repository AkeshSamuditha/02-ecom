import { NextResponse } from "next/server";
import prisma from "../../../lib//prisma";
import { hash } from "bcryptjs";

export const POST = async (request) => {
  const body = await request.json();
  const { firstName, lastName, email, password } = body;
  const name = `${firstName} ${lastName}`;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 12),
        name,
      },
    });
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
