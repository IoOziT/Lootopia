import { Context, Hono } from "hono";
import { portefeuilleService } from "../service/portefeuilleService";

const portefeuilleController = new Hono();

portefeuilleController.get(
  "/get-for-user/:userId",
  async (context: Context) => {
    const portefeuille = await portefeuilleService.findByUser(context);

    return context.json(portefeuille, 200);
  }
);

export default portefeuilleController;
