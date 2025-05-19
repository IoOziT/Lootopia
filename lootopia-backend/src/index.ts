import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { utilisateurController } from "./controller/utilisateurController";
import { chasseController } from "./controller/chasseController";

const app = new Hono();
app.use(cors());
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

app.get("/", (context) => {
  return context.json("api is working", 200);
});

app.notFound((context) => {
  return context.json("Custom 404 Message", 404);
});

app.route("/user", utilisateurController);
app.route("/chasse", chasseController);

serve({
  fetch: app.fetch,
  port,
});

export default app;
