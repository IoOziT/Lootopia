import type { Context } from "hono";
import { Hono } from "hono";
import { utilisateurService } from "../service/utilisateurService";
import { authMiddleware } from "../middleware/authMiddleware";

const utilisateurController = new Hono();

utilisateurController.use("/protected/*", authMiddleware);

utilisateurController.post("/create", async (context: Context) => {
  const utilisateur = await utilisateurService.create(context);
  return context.json(utilisateur, 201);
});

// GET WALLET
utilisateurController.post("/protected/wallet", async (context: Context) => {
  console.log("requestBody", await context.req.json());
  const requestBody = await context.req.json();
  console.log("AGAIN", requestBody);
  const utilisateur = await utilisateurService.findByEmail(requestBody.email);

  return context.json(utilisateur, 200);
});

// FIND BY EMAIL
utilisateurController.get("/protected/get/:email", async (context: Context) => {
  const utilisateur = await utilisateurService.findByEmail(
    context.req.param().email
  );
  return context.json(utilisateur, 200);
});

// UPDATE
utilisateurController.put("/protected/:id", async (context: Context) => {
  const utilisateur = await utilisateurService.update(context);
  return context.json(utilisateur, 200);
});

// DELETE
utilisateurController.delete("/protected/:id", async (context: Context) => {
  await utilisateurService.delete(context);
  return context.json("Deleted", 200);
});

// FIND BY ID
utilisateurController.get("/protected/:id", async (context: Context) => {
  const utilisateur = await utilisateurService.findById(
    Number(context.req.param().id)
  );
  return context.json(utilisateur, 200);
});

export { utilisateurController };
