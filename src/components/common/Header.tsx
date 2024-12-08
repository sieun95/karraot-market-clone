import Link from "next/link";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
export default async function Header() {
  // 서버 측에서 세션 데이터 읽기
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  console.log("session : ", session.user);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/home">홈</Link>
      <nav className="space-x-4">
        {session.user ? (
          <>
            <Link href="/tweets">트윗 보기</Link>
            <Link href={`/profile`}>{session.user.username}</Link>
            <form action="/api/logout" method="POST">
              <button type="submit" className="text-white">
                로그아웃
              </button>
            </form>
          </>
        ) : (
          <Link href="/sign-in">로그인</Link>
        )}
      </nav>
    </header>
  );
}
