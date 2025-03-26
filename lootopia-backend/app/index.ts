import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
//app.use(cors())
const port = 3000;

app.get("/", (context) => {
  return context.json("api is working", 200);
});

app.notFound((context) => {
  return context.json("Custom 404 Message", 404);
});

serve({
  fetch: app.fetch,
  port,
});

export default app;
