import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/server/auth";
import { consumeMagicLink } from "@/lib/server/store";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const session = await consumeMagicLink(token);
  const response = NextResponse.redirect(new URL("/", request.url));

  if (!session) {
    return response;
  }

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: session.token,
    expires: new Date(session.expiresAt),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });

  return response;
}
