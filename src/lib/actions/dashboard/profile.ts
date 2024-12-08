import { prisma } from "@/lib/db/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/session";
import { SessionData } from "@/types/auth";
import { cookies } from "next/headers";

export async function getProfileAction() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      username: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
}
