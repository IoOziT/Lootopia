import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
require("dotenv").config();

const prisma = new PrismaClient();

export const etapeService = {
  findByChasseId: async (chasse_id: number) => {
    console.log("chasse_id", chasse_id);
    return await prisma.etape.findMany({
      where: {
        chasse_id: chasse_id,
      },
    });
  },

  create: async (etapeInput: any) => {
    try {
      const createdEtape = await prisma.etape.create({
        data: etapeInput,
      });
      return createdEtape;
    } catch (error) {
      console.error("Error while creating etape :", error);
      throw error;
    }
  },

  findAll: async () => {
    return await prisma.etape.findMany();
  },

  findById: async (id: number) => {
    const etape = await prisma.etape.findFirst({
      where: { id },
    });
    return etape;
  },

  update: async (context: Context) => {
    const etapeInput = await context.req.json();
    const id = etapeInput.etape.id;
    const updatedEtape = await prisma.etape.update({
      where: { id },
      data: etapeInput,
    });
    return updatedEtape;
  },

  delete: async (context: Context) => {
    const json = await context.req.json();
    const id = json.id;
    const deletedEtape = await prisma.etape.delete({
      where: { id },
    });
    return deletedEtape;
  },
};
