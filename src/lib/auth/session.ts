import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionContent } from "@/types/auth";
import { prisma } from "@/lib/db/prisma";
import { User } from "@/types/users";
import { redirect } from "next/navigation";

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "karrot-session",
};

export const saveCookie = async (user: User) => {
  const cookie = await getIronSession<SessionContent>(cookies(), sessionOptions);
  await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
    },
  });

  cookie.id = user.id;
  await cookie.save();
  redirect("/profile");
};
