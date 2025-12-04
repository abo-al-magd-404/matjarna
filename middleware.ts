// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes that require authentication
const PROTECTED_ROUTES = ["/checkout", "/profile"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check for auth token in cookies
  const token = req.cookies.get("token")?.value;

  // Protect specific routes
  if (PROTECTED_ROUTES.includes(pathname)) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/account/login";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/categories/")) {
    const slug = pathname.split("/")[2];

    if (!slug || slug.trim() === "") {
      const url = req.nextUrl.clone();
      url.pathname = "/not-found";
      return NextResponse.rewrite(url);
    }
  }

  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  return res;
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/checkout", "/profile", "/categories/:path*"],
};
