"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/db/prisma";
import { SignUpState } from "@/types/auth";
import { signUpSchema } from "@/lib/validations/auth";
import { saveCookie } from "@/lib/auth/session";

export async function signUpAction(prevState: SignUpState, formData: FormData) {
  // 1. 입력값 유효성 검사
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = signUpSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // 2. 이메일 중복 확인
  const exists = await prisma.user.findUnique({
    where: { email: result.data.email },
  });

  if (exists) {
    return {
      errors: {
        email: ["이미 사용 중인 이메일입니다"],
      },
    };
  }

  // 3. 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(result.data.password, 12);

  // 4. 사용자 생성
  try {
    const user = await prisma.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    // 5. 쿠키 저장
    await saveCookie(user);
    console.log("회원가입 성공");
    return { success: true };
  } catch (error) {
    console.error("회원가입 에러:", error);
    return {
      errors: {
        username: [],
        email: [],
        password: [],
        passwordConfirm: [],
        _form: ["회원가입 중 오류가 발생했습니다"],
      },
    };
  }
}
