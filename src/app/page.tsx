import Link from "next/link";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
// 서버 측에서 세션 데이터 읽기

export default async function Home() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  console.log("session : ", session.user?.id);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">🥕</span>
        <h1 className="text-4xl ">당근</h1>
        <h2 className="text-2xl">당근 마겟에 어서오세요!</h2>
      </div>
      {!session.user?.id ? (
        <div className="flex flex-col items-center gap-3 w-full">
          <Link href="/sign-up" className="primary-btn text-lg py-2.5">
            회원가입
          </Link>
          <div className="flex gap-2">
            <span>이미 계정이 있나요?</span>
            <Link href="/sign-in" className="hover:underline">
              로그인
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
