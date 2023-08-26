import { NextResponse } from "next/server";
import prisma from "../../lib//prisma";

export async function GET(request, reponse) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
