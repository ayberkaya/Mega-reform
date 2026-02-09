import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = [
  "/",
  "/giris",
  "/kayit",
  "/sifremi-unuttum",
  "/dogrulama",
  "/uzmanlar",
  "/makaleler",
  "/kurslar",
  "/videolar",
  "/kategoriler",
  "/hakkimizda",
  "/iletisim",
  "/gizlilik-politikasi",
  "/kullanim-sartlari",
  "/sikca-sorulan-sorular",
  "/api/chatbot",
  "/api/auth",
];

const authRoutes = ["/giris", "/kayit", "/sifremi-unuttum", "/dogrulama"];
const expertRoutes = ["/uzman"];
const adminRoutes = ["/yonetim"];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow static files, API auth routes, and _next
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  const userRole = token?.role as string | undefined;

  // Auth routes: redirect to panel if already logged in
  if (authRoutes.some((r) => pathname.startsWith(r))) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/panel", req.url));
    }
    return NextResponse.next();
  }

  // Public routes: allow all
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Protected routes: redirect to login if not authenticated
  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/giris?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  // Expert routes: require EXPERT or ADMIN role
  if (expertRoutes.some((r) => pathname.startsWith(r))) {
    if (userRole !== "EXPERT" && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/panel", req.url));
    }
  }

  // Admin routes: require ADMIN role
  if (adminRoutes.some((r) => pathname.startsWith(r))) {
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/panel", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
