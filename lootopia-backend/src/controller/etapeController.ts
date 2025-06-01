import type { Context } from "hono";
import { Hono } from "hono";
import { etapeService } from "../service/etapeService";
import { authMiddleware } from "../middleware/authMiddleware";

const etapeController = new Hono();

etapeController.use("/protected/*", authMiddleware);

// FIND BY CHASSE ID
etapeController.get(
  "/protected/chasse/:chasse_id",
  async (context: Context) => {
    const etape = await etapeService.findByChasseId(
      Number(context.req.param().chasse_id)
    );
    return context.json(etape, 200);
  }
);

// CREATE
etapeController.post("/protected/create", async (context: Context) => {
  const requestBody = await context.req.json();
  const etapeInput = requestBody.etapeInput;

  const etape = await etapeService.create(etapeInput);
  return context.json(etape, 201);
});

// UPDATE
etapeController.put("/protected/:id", async (context: Context) => {
  const etape = await etapeService.update(context);
  return context.json(etape, 200);
});

// DELETE
etapeController.delete("/protected/:id", async (context: Context) => {
  await etapeService.delete(context);
  return context.json("Deleted", 200);
});

// FIND BY ID
etapeController.get("/protected/:id", async (context: Context) => {
  const etape = await etapeService.findById(Number(context.req.param().id));
  return context.json(etape, 200);
});

export { etapeController };
