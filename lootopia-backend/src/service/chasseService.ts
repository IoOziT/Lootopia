import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
require("dotenv").config();

const prisma = new PrismaClient();

export const chasseService = {
  create: async (context: Context) => {
    try {
      const requestBody = await context.req.json();

      const createdChasse = await prisma.chasse.create({
        data: requestBody,
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
};
