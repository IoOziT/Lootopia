import { PrismaClient } from "@prisma/client";
import { Context, Hono } from "hono";

const prisma = new PrismaClient();

export const portefeuilleService = {
  findByUser: async (context: Context) => {
    const userId = Number(context.req.param().userId);
    const portefeuille = await prisma.portefeuille.findFirst({
      where: { utilisateur_id: userId },
    });
    return portefeuille;
  },
  gainCouronne: async (context: Context) => {
    const userId = Number(context.req.param().userId);
    const amountGained = Number(context.req.param().amountGained);
    const portefeuille = await prisma.portefeuille.findFirst({
      where: { utilisateur_id: userId },
    });
    //user.wallet += amountGained;
    if (portefeuille) {
      const creditorWalletUpdate = await prisma.portefeuille.update({
        where: { utilisateur_id: userId },
        data: {
          contenu: amountGained,
        },
      });
      return creditorWalletUpdate ? creditorWalletUpdate : null;
    }
    return null;
  },
};
