import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log("req", req.cookies.get("userCookie"));
  if (req.cookies.get("userCookie")) return;

  const random = Math.random().toString();

  const res = NextResponse.next();
  res.cookies.set("userCookie", random, { sameSite: "strict", path: "none" });
  return res;
}
