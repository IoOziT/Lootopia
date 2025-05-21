import type { Context } from "hono";
import { Hono } from "hono";
import { chasseService } from "../service/chasseService";
import { authMiddleware } from "../middleware/authMiddleware";
import { utilisateurService } from "../service/utilisateurService";

const chasseController = new Hono();

chasseController.use("/protected/*", authMiddleware);

// CREATE
chasseController.post("/protected/create", async (context: Context) => {
  const requestBody = await context.req.json();
  const chasseInput = requestBody.chasseInput;
  const email = requestBody.email;
  const createur = await utilisateurService.findByEmail(email);
  if (!createur) {
    return context.json("User not found", 404);
  }
  chasseInput.createur_id = createur.id;
  const chasse = await chasseService.create(chasseInput);
  return context.json(chasse, 201);
});

// UPDATE
chasseController.put("/protected/:id", async (context: Context) => {
  const chasse = await chasseService.update(context);
  return context.json(chasse, 200);
});

// DELETE
chasseController.delete("/protected/:id", async (context: Context) => {
  await chasseService.delete(context);
  return context.json("Deleted", 200);
});

// FIND BY ID
chasseController.get("/protected/:id", async (context: Context) => {
  const chasse = await chasseService.findById(Number(context.req.param().id));
  return context.json(chasse, 200);
});

export { chasseController };
