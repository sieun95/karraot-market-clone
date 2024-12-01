"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const createAccountSchema = z
  .object({
    username: z.string().min(2, "이름은 2글자 이상이어야 합니다"),
    email: z.string().email("올바른 이메일 주소를 입력해주세요"),
    password: z.string().min(4, "비밀번호는 4자리 이상이어야 합니다"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

interface CreateAccountState {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    passwordConfirm?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createAccountAction(prevState: CreateAccountState, formData: FormData) {
  // 1. 입력값 유효성 검사
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = createAccountSchema.safeParse(data);
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
  console.log("원본 비밀번호:", result.data.password);
  console.log("해싱된 비밀번호:", hashedPassword);

  // 4. 사용자 생성
  try {
    await prisma.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
    });
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
