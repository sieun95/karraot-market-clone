"use server";

import { prisma } from "@/lib/db/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import { cookies } from "next/headers";
import { TweetState } from "@/types/users";

export async function addTweetAction(prevState: TweetState, formData: FormData) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const userId = session.user?.id;
  const content = formData.get("content") as string | null;

  if (content === null) {
    return { success: false, error: "트윗 내용이 비어 있습니다." };
  }

  console.log("userId : ", userId);

  try {
    const tweet = await prisma.tweet.create({
      data: {
        content,
        user: {
          connect: { id: userId },
        },
      },
    });
    return { success: true, tweet };
  } catch (error) {
    console.error("트윗 추가 에러:", error);
    return { success: false, error: "트윗 추가 중 오류가 발생했습니다." };
  }
}
