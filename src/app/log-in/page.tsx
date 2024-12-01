"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import { useFormState } from "react-dom";
import { loginAction } from "@/lib/actions/login";

export default function Login() {
  const [state, formAction] = useFormState(loginAction, {
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
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
          />
          {state.errors?.email && <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
          />
          {state.errors?.password && <p className="mt-1 text-sm text-red-600">{state.errors.password[0]}</p>}
        </div>
        <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600">
          로그인
        </button>
      </form>
      <p className="mt-4">
        계정이 없으신가요?{" "}
        <Link href="/create-account" className="text-orange-500 hover:text-orange-600">
          회원가입하기
        </Link>
      </p>
    </div>
  );
}
