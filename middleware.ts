import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get("user");

  const isLoggedIn = !!cookie;

  if (
    (pathname === "/auth/sign-in" || pathname === "/auth/sign-up") &&
    isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const protectedPaths = ["/cart", "/profile", "/addresses", "/order"];
  if (protectedPaths.includes(pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
