import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

export async function getProfileAction() {
  const session = await getSession();
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
