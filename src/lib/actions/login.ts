"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

interface LoginState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  success?: boolean;
}

export async function loginAction(prevState: LoginState, formData: FormData) {
  // 1. 입력값 유효성 검사
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // 2. 이메일 존재 여부 확인
  const user = await prisma.user.findUnique({
    where: { email: result.data.email },
  });

  if (!user) {
    return {
      errors: {
        email: ["이메일이 존재하지 않습니다"],
      },
    };
  }

  // 3. 비밀번호 일치 여부 확인
  const passwordMatch = await bcrypt.compare(result.data.password, user.password);

  if (!passwordMatch) {
    return {
      errors: {
        password: ["비밀번호가 일치하지 않습니다"],
      },
    };
  }

  // 4. 로그인 성공 - 세션 생성
  const session = await getSession();
  session.user = {
    id: user.id,
    email: user.email,
    name: user.username,
  };
  await session.save();

  return { success: true };
}
