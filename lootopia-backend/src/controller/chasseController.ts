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
chasseController.get("/", async (context: Context) => {
  const chasses = await chasseService.findAll();
  return context.json(chasses, 200);
});

// FIND BY ID (protected)
chasseController.get("/protected/:id", async (context: Context) => {
  const id = Number(context.req.param("id"));
  const chasse = await chasseService.findById(id);
  return context.json(chasse, 200);
});

// INSCRIPTION
chasseController.post("/protected/:id/inscription", async (context: Context) => {
  const chasseId = Number(context.req.param("id"));
  const user = context.get("user"); // ✅ Auth0 middleware

  try {
    const utilisateur = await utilisateurService.findByEmail(user.email);
    if (!utilisateur) {
      return context.json({ message: "Utilisateur non trouvé" }, 404);
    }

    const participation = await chasseService.register(chasseId, utilisateur.id);
    return context.json(participation, 201);
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return context.json({ message: "Erreur lors de l'inscription" }, 500);
  }
});



export { chasseController };
