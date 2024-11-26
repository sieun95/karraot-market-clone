"use client";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
export default function Login() {
  const [state, action] = useFormState(
    (state: { message: string; success: boolean } | null, formData: FormData) => handleForm(formData),
    null
  );

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Login with email and password</h2>
      </div>
      {state?.message && (
        <div className={`p-4 rounded-md ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{state.message}</div>
      )}
      <form action={action} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="이메일" required={true} errors={[]} />
        <FormInput name="username" type="string" placeholder="유저 이름" required={true} errors={[]} />
        <FormInput name="password" type="password" placeholder="비밀번호" required={true} errors={[]} />
        <FormButton text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
