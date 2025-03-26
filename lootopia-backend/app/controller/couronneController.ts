import { Context, Hono } from "hono";
import { couronneService } from "../service/couronneService";

const couronneController = new Hono();

couronneController.get("/:id/purchase/check", async (context: Context) => {
  const couronnes = await couronneService.getByUser(context);

  return context.json(couronnes, 200);
});

export default couronneController;
