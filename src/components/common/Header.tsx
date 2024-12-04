"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 쿠키 확인 로직
    const checkLoginStatus = () => {
      const cookies = document.cookie.split("; ");
      console.log(cookies);
      const sessionCookie = cookies.find((cookie) => cookie.startsWith("karrot-session="));
      setIsLoggedIn(!!sessionCookie);
    };

    checkLoginStatus();
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/">홈</Link>
      <nav className="space-x-4">
        <Link href="/tweets">트윗 보기</Link>
        {isLoggedIn ? <Link href="/profile">프로필 보기</Link> : <Link href="/sign-in">로그인</Link>}
      </nav>
    </header>
  );
}
