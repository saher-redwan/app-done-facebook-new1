import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // console.log(req.nextUrl.pathname);
    // console.log(req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/admin-page") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/settings")) {
      return NextResponse.rewrite(new URL("/not-supported-yet", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin-page",
    "/addPost",
    // this below for nested pages (here for id page inside profile page - /profile/123456 ...)
    "/profile/:path*",
    "/settings",
  ],
};
