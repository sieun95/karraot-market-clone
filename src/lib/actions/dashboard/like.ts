"use server";

import { prisma } from "@/lib/db/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import { cookies } from "next/headers";

export async function toggleLikeAction(tweetId: number) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: "사용자 ID를 찾을 수 없습니다." };
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        tweetId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return { success: true, liked: false };
    } else {
      await prisma.like.create({
        data: {
          tweet: {
            connect: { id: tweetId },
          },
          user: {
            connect: { id: userId },
          },
        },
      });
      return { success: true, liked: true };
    }
  } catch (error) {
    console.error("좋아요 토글 에러:", error);
    return { success: false, error: "좋아요 토글 중 오류가 발생했습니다." };
  }
}
