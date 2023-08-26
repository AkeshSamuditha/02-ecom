import { NextResponse } from "next/server";

import prisma from "../../../lib/prisma";

export async function GET(request, { params }) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(JSON.stringify(product), { status: 200 });
}
