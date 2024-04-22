import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("uit")?.value || "";

  const isPublicPath =
    path === "/login" || path === "/register" || path === "/verifyemail";

  //   if (isPublicPath && token) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  //   if (!isPublicPath && !token) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }

  const isPrivate = path.startsWith("/profile");

  if (isPrivate && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  //   matcher: ["/", "/profile", "/login", "/register", "/verifyemail"],
  matcher: (req: NextRequest) => {
    const path = req.nextUrl.pathname;
    return path.startsWith("/profile");
  },
};
