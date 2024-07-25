import { NextResponse } from "next/server";
import { verifyJwtToken } from "./utils/JwtVerifiy";

const AUTH_PAGES = ["/"];

const isAuthPage = (url: string) => AUTH_PAGES.includes(url);

export async function middleware(request: any) {
  const { nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPage(nextUrl.pathname);

  if (!hasVerifiedToken && !isAuthPageRequested) {
    const response = NextResponse.redirect(new URL("/", nextUrl.origin));
    response.cookies.delete("token");
    return response;
  }

  if (hasVerifiedToken && isAuthPageRequested) {
    const response = NextResponse.redirect(new URL("/job-list", nextUrl.origin));
    return response;
  }

  return NextResponse.next();
}

export const config = { matcher: ["/", "/job-list"] };
