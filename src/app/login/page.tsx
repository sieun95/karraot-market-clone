"use client";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
// import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
export default function Login() {
  const [state, dispatch] = useFormState(handleForm, null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <svg className="w-12 h-12 text-red-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        </div>
        <form action={dispatch} className="flex flex-col gap-3">
          <FormInput name="username" type="text" placeholder="유저 이름" required errors={state?.fieldErrors.username ?? []} />
          <FormInput name="email" type="email" placeholder="이메일" required errors={state?.fieldErrors?.email ?? []} />
          <FormInput name="password" type="password" placeholder="비밀번호" required errors={state?.fieldErrors?.password ?? []} />
          <FormButton text="로그인" />
        </form>
        {/* <SocialLogin /> */}
      </div>
    </div>
  );
}
