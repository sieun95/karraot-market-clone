"use server";

import { prisma } from "@/lib/db/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import { cookies } from "next/headers";
import { replySchema } from "@/lib/validations/replyValidation";

export async function addReplyAction(tweetId: number, formData: FormData) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const userId = session.user?.id;
  const content = formData.get("content") as string | null;

  if (!content) {
    return { success: false, error: "답글 내용이 비어 있습니다." };
  }

  const validation = replySchema.safeParse({ content });
  if (!validation.success) {
    return { success: false, error: validation.error.errors[0].message };
  }

  try {
    const response = await prisma.response.create({
      data: {
        content,
        user: {
          connect: { id: userId },
        },
        tweet: {
          connect: { id: tweetId },
        },
      },
    });
    return { success: true, response };
  } catch (error) {
    console.error("답글 추가 에러:", error);
    return { success: false, error: "답글 추가 중 오류가 발생했습니다." };
  }
}
