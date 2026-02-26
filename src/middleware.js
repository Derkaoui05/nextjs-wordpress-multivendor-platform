import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  const userData = request.cookies.get("user_data")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboard = pathname.startsWith("/admin") ||
                      pathname.startsWith("/vendor") ||
                      pathname.startsWith("/account");

  // Not logged in trying to access dashboard → redirect to login
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Already logged in trying to access login/register → redirect away
  if (token && isAuthPage) {
    const user = userData ? JSON.parse(userData) : null;
    const roles = user?.roles || [];
    if (roles.includes("administrator")) return NextResponse.redirect(new URL("/admin", request.url));
    if (roles.includes("seller"))        return NextResponse.redirect(new URL("/vendor", request.url));
    return NextResponse.redirect(new URL("/account", request.url));
  }

  // Vendor trying to access /admin → block
  if (userData && pathname.startsWith("/admin")) {
    const user = JSON.parse(userData);
    if (!user.roles.includes("administrator")) {
      return NextResponse.redirect(new URL("/vendor", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*", "/account/:path*", "/login", "/register"],
};