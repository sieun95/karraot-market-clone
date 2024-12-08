import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { User } from "@/types/users";

import { SessionData } from "@/types/auth";

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "karrot-session",
};

export const saveCookie = async (user: User | null) => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (user) {
    session.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }

  await session.save();
};
