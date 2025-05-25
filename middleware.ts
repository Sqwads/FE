import { NextRequest, NextResponse } from "next/server";



export default function middleware(req: NextRequest) {
  const unauthenticatedRoutes: any = [
    '/',
    '/login',
    '/signup',
    '/emailauth',
    '/forgetpass',
    '/confirmation',
    '/createnew',
    '/passwordupdt',
    '/welcome',
    '/admin_emailauth',
    '/admin_signup',
    '/admin_login',
    '/mentorship_home'
  ]

  const user = req.cookies.get("access_token")?.value
  // console.log(unauthenticatedRoutes.includes(req.nextUrl.pathname))
  if (!unauthenticatedRoutes.includes(req.nextUrl.pathname)) {

    const url = req.nextUrl.clone();
    url.pathname = "/";
    if (!user) {
      return NextResponse.redirect(url);
    }

  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next
   * - | static (static files)
   * - | image (image optimization files)
   * - | data (json files)
   * - api (API routes)
   *
   * Also, skip all files ending with an extension
   * - favicon.ico (favicon file)
   * - public (assets)
   */
  matcher: "/((?!api|_next|.*\\..*).*)",
};