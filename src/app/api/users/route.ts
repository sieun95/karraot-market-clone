import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
});

const userSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  username: z.string().min(2, "이름은 2글자 이상이어야 합니다"),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다")
    .regex(/[0-9]/, "숫자를 포함해야 합니다")
    .regex(/[a-z]/, "영문 소문자를 포함해야 합니다"),
});

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email") || undefined;

  const result = emailSchema.safeParse({ email });
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return NextResponse.json({
    exists: !!user,
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = userSchema.safeParse(data);

    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // 이메일 중복 확인
    const exists = await prisma.user.findUnique({
      where: { email: result.data.email },
    });

    if (exists) {
      return NextResponse.json(
        {
          errors: { email: ["이미 사용 중인 이메일입니다"] },
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        errors: { _form: ["잘못된 요청입니다"] },
      },
      { status: 400 }
    );
  }
}
