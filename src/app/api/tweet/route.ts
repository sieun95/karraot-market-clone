"use server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);
  return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(request: NextRequest) {
  console.log(request);
  return NextResponse.json({ message: "Hello, world!" });
}
