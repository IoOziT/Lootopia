import { PrismaClient } from "@prisma/client";
import { Context, Hono } from "hono";

const prisma = new PrismaClient();

export const couronneService = {
  getByUser: async (context: Context) => {
    const id = Number(context.req.param().id);
    const nft = await prisma.nft.findFirst({
      where: { id },
    });
    return nft;
  },
};
