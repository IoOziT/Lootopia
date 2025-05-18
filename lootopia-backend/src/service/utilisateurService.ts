import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
require("dotenv").config();

const prisma = new PrismaClient();

export const utilisateurService = {
  gainCouronnes: async (utilisateur: Utilisateur, amount: number) => {
    if (utilisateur) {
      utilisateur.portefeuille += amount;
      const creditorWalletUpdate = await prisma.utilisateur.update({
        where: { id: utilisateur.id },
        data: {
          portefeuille: utilisateur.portefeuille,
        },
      });
      return creditorWalletUpdate ? creditorWalletUpdate : null;
    }
    return null;
  },

  fundTransfer: async (
    debitor: Utilisateur,
    creditor: Utilisateur,
    amount: number
  ) => {
    if (debitor.portefeuille < amount) {
      return null;
    }
    debitor.portefeuille -= amount;
    creditor.portefeuille += amount;
    const debitorportefeuilleUpdate = await prisma.utilisateur.update({
      where: { id: debitor.id },
      data: {
        portefeuille: debitor.portefeuille,
      },
    });
    const creditorportefeuilleUpdate = await prisma.utilisateur.update({
      where: { id: creditor.id },
      data: {
        portefeuille: creditor.portefeuille,
      },
    });

    if (debitorportefeuilleUpdate && creditorportefeuilleUpdate) {
      return {
        debitorportefeuilleUpdate: debitorportefeuilleUpdate,
        creditorportefeuilleUpdate: creditorportefeuilleUpdate,
      };
    }
    return null;
  },

  findByEmail: async (email: string) => {
    const utilisateur = await prisma.utilisateur.findFirst({
      where: { email },
    });
    console.log("utilisateur", utilisateur);
    return utilisateur;
  },

  create: async (context: Context) => {
    try {
      const userInput = await context.req.json();
      console.log(userInput);
      console.log(userInput.email);
      console.log(userInput.name);
      const createdUser = await prisma.utilisateur.create({
        data: {
          email: userInput.email,
          name: userInput.username,
          role_id: 1,
          portefeuille: 0,
        },
      });
      return createdUser;
    } catch (error) {
      console.error("Error while creating user :", error);
      throw error;
    }
  },

  findAll: async () => {
    return await prisma.utilisateur.findMany();
  },

  existsByEmail: async (context: Context) => {
    const email = String(await context.req.json());
    const utilisateur = await prisma.utilisateur.findFirst({
      where: { email },
    });
    if (utilisateur) {
      return true;
    }
    return false;
  },

  findById: async (id: number) => {
    const utilisateur = await prisma.utilisateur.findFirst({
      where: { id },
    });
    return utilisateur;
  },

  update: async (context: Context) => {
    const utilisateurInput = await context.req.json();
    const id = utilisateurInput.utilisateur.id;
    const updatedutilisateur = await prisma.utilisateur.update({
      where: { id },
      data: {
        email: utilisateurInput.utilisateur.email,
      },
    });
    return updatedutilisateur;
  },

  delete: async (context: Context) => {
    const json = await context.req.json();
    const id = json.id;
    const deletedutilisateur = await prisma.utilisateur.delete({
      where: { id },
    });
    return deletedutilisateur;
  },
};
