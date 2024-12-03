"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { SessionData } from "@/lib/session";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  if (!session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const tweets = await prisma.tweet.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ tweets });
  } catch (error) {
    res.status(500).json({ error: "Error fetching tweets" });
  }
}
