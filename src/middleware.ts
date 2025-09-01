import {NextRequest, NextResponse} from "next/server";
import {determineLocale} from "@/api/locale";


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (determineLocale(pathname) === undefined) {
    request.nextUrl.pathname = `/nl${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
