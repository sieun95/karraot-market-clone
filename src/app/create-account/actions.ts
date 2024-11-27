"use server";
import { z } from "zod";

const formSchema = z
  .object({
    username: z.string().min(5),
    email: z
      .string()
      .email()
      .refine((email) => email.endsWith("@zod.com"), { message: "@zod.com 으로 끝나야 합니다." }),
    password: z.string().min(10, { message: "비밀번호는 최소 10글자 이상이어야 합니다." }).regex(/\d/, { message: "비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다." }),
    passwordConfirm: z.string().min(10),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"], // 에러를 passwordConfirm 필드에 표시
  });

export async function createAccount(prevState: any | null, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const validationResult = formSchema.safeParse(data);

  if (!validationResult.success) {
    console.log(validationResult.error.flatten());
    return validationResult.error.flatten();
  }

  console.log(data);
}
