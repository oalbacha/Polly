import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const res = NextResponse.next();
  if (req.cookies.get("poll-token")) {
    return;
  }
  res.cookies.set("poll-token", uuidv4(), { sameSite: "strict" });
  return res;
}
