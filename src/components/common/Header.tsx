import Link from "next/link";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import { signOutAction } from "@/lib/actions/auth/signOut";

export default async function Header() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-800 to-gray-900 shadow-md">
      <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition duration-300">
        홈
      </Link>
      <nav className="space-x-6">
        {session.user ? (
          <>
            <Link href="/tweets" className="text-white hover:text-gray-200 transition duration-300">
              트윗 보기
            </Link>
            <Link href="/profile" className="text-white hover:text-gray-200 transition duration-300">
              {session.user.email}
            </Link>
            <form action={signOutAction} className="inline">
              <button type="submit" className="text-white hover:text-gray-200 transition duration-300">
                로그아웃
              </button>
            </form>
          </>
        ) : (
          <Link href="/sign-in" className="text-white hover:text-gray-200 transition duration-300">
            로그인
          </Link>
        )}
      </nav>
    </header>
  );
}
