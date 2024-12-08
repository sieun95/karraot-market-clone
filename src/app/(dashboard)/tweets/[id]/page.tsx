"use client";
import { useState, FormEvent } from "react";
import { addReplyAction } from "@/lib/actions/dashboard/reply";
import { toggleLikeAction } from "@/lib/actions/dashboard/like";

export default function TweetPage(tweetId: number) {
  const [replyContent, setReplyContent] = useState("");
  const [liked, setLiked] = useState(false);

  const handleReplySubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("content", replyContent);

    const result = await addReplyAction(tweetId, formData);
    if (result.success) {
      // 답글 추가 성공 처리
      setReplyContent(""); // 입력 필드 초기화
    } else {
      // 오류 처리
      console.error(result.error);
    }
  };

  const handleLikeToggle = async () => {
    const result = await toggleLikeAction(tweetId);
    if (result.success && typeof result.liked === "boolean") {
      setLiked(result.liked);
    } else {
      // 오류 처리
      console.error(result.error);
    }
  };

  return (
    <>
      <h1>트윗 상세 페이지</h1>
      <button onClick={handleLikeToggle}>{liked ? "좋아요 취소" : "좋아요"}</button>
      <form onSubmit={handleReplySubmit}>
        <input type="text" value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="답글을 입력하세요" />
        <button type="submit">답글 추가</button>
      </form>
    </>
  );
}
