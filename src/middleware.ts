import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.cookies.get("poll-token")) return;

  const res = NextResponse.next();
  res.cookies.set("poll-token", uuidv4(), { sameSite: "strict" });
  return res;
}
