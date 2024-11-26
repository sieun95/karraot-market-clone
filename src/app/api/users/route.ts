import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  return NextResponse.json(data);
}
