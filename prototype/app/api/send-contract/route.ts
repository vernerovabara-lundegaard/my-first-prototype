import { NextResponse } from "next/server";

export async function POST() {
  // Prototype: no real sending, no data storage
  return NextResponse.json({ ok: true, message: "Mock: contract send" });
}
