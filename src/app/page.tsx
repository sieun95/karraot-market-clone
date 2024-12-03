"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type Tweet = {
  id: number;
  content: string;
};

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 세션 확인
    const checkSession = async () => {
      const response = await fetch("/api/tweets");
      const data = await response.json();
      setIsLoggedIn(data.isLoggedIn);

      if (data.isLoggedIn) {
        fetchTweets();
      }
    };

    checkSession();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await fetch("/api/tweets");
      const data = await response.json();
      setTweets(data.tweets);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  return (
    <div className="tweet-list">
      {isLoggedIn ? (
        <>
          <h1>트윗 목록</h1>
          <ul>
            {tweets.map((tweet) => (
              <li key={tweet.id}>
                <Link href={`/tweets/${tweet.id}`}>{tweet.content}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>
          <p>로그인하세요</p>
          <Link href="/log-in">로그인</Link>
        </div>
      )}
    </div>
  );
}
