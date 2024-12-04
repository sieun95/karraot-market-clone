"use server";

import { prisma } from "@/lib/db/prisma";
import { tweetSchema } from "@/lib/validations/tweet";

interface TweetState {
  errors?: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function addTweetAction(prevState: TweetState, formData: FormData): Promise<TweetState> {
  const data = {
    content: formData.get("content"),
  };

  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    await prisma.tweet.create({
      data: {
        content: result.data.content,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("트윗 저장 에러:", error);
    return { errors: { _form: ["트윗 저장 중 오류가 발생했습니다"] } };
  }
}
