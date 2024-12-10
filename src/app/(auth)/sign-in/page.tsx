"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signInAction } from "@/lib/actions/auth/signIn";
import FormButton from "@/components/ui/form-btn";
import FormInput from "@/components/ui/form-input";

export default function SignIn() {
  const [state, formAction] = useFormState(signInAction, {
    errors: { email: [], password: [] },
    success: undefined,
  });

  if (state.success) {
    redirect("/profile");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8">로그인</h1>
      <form action={formAction} className="w-full max-w-sm space-y-4">
        <FormInput name="email" type="email" placeholder="이메일" required={true} errors={state.errors?.email || []} />
        <FormInput name="password" type="password" placeholder="비밀번호" required={true} errors={state.errors?.password || []} />
        <FormButton text="로그인" />
      </form>
      <p className="mt-4">
        계정이 없으신가요?{" "}
        <Link href="/sign-up" className="text-orange-500 hover:text-orange-600">
          회원가입하기
        </Link>
      </p>
    </div>
  );
}
