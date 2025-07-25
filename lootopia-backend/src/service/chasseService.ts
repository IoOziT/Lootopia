import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
import { utilisateurService } from "./utilisateurService";
import "dotenv/config";

const prisma = new PrismaClient();

export const chasseService = {
  create: async (chasseInput: any) => {
    try {
      const createdChasse = await prisma.chasse.create({
        data: chasseInput,
      });
      return createdChasse;
    } catch (error) {
      console.error("Error while creating chasse :", error);
      throw error;
    }
  },

  findAll: async () => {
    return await prisma.chasse.findMany();
  },

  findById: async (id: number) => {
    const chasse = await prisma.chasse.findFirst({
      where: { id },
    });
    return chasse;
  },

  update: async (context: Context) => {
    const chasseInput = await context.req.json();
    const id = chasseInput.Chasse.id;
    const updatedChasse = await prisma.chasse.update({
      where: { id },
      data: chasseInput,
    });
    return updatedChasse;
  },

  delete: async (context: Context) => {
    const json = await context.req.json();
    const id = json.id;
    const deletedChasse = await prisma.chasse.delete({
      where: { id },
    });
    return deletedChasse;
  },

  register: async (chasseId: number, utilisateurId: number) => {
  return await prisma.participer.create({
    data: {
      chasse_id: chasseId,
      utilisateur_id: utilisateurId,
    },
  });
},
};
