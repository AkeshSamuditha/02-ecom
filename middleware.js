import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export default function middleware(req, res, next) {

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.isAdmin === false
    ) {
      return NextResponse.redirect("/");
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.isAdmin === true,
    },
  }
);

export const config = { matcher: ["/profile/:path*", "/admin/:path*"] };
