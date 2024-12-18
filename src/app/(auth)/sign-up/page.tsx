"use client";

import { useFormState } from "react-dom";
import { signUpAction } from "@/lib/actions/auth/signUp";
import FormInput from "@/components/ui/form-input";
import FormButton from "@/components/ui/form-btn";
import SocialLogin from "@/components/ui/social-login";
import { redirect } from "next/navigation";

export default function SignUp() {
  const [state, formAction] = useFormState(signUpAction, {
    errors: { username: [], email: [], password: [], passwordConfirm: [], _form: [] },
    success: undefined,
  });

  if (state.success) {
    redirect("/profile");
  }

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        <FormInput name="username" type="text" placeholder="유저 이름" required={true} errors={state.errors?.username || []} />
        <FormInput name="email" type="email" placeholder="이메일" required={true} errors={state.errors?.email || []} />
        <FormInput name="password" type="password" placeholder="비밀번호" required={true} errors={state.errors?.password || []} />
        <FormInput name="passwordConfirm" type="password" placeholder="비밀번호 확인" required={true} errors={state.errors?.passwordConfirm || []} />
        <FormButton text="회원가입" />
      </form>
      <SocialLogin />
    </div>
  );
}
