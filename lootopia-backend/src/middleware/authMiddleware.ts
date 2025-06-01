import { Context, Next } from "hono";
import * as jwt from "jsonwebtoken";

export async function authMiddleware(ctx: Context, next: Next) {
  const authHeader = ctx.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ctx.json({ message: "Unauthorized" }, 401);
  }

  const token = authHeader.substring(7);
  try {
   
   
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || typeof decoded === "string") {
      throw new Error("Invalid token");
    }
    // cast payload en JwtPayload pour accéder aux claims
    const payload = decoded.payload as jwt.JwtPayload;
    // // Vérifie que l'issuer est bien celui d'Auth0 (avec un '/' à la fin)
    if (payload.iss !== `https://${process.env.AUTH0_DOMAIN}/`) {
      throw new Error("Issuer invalid");
    }
    await next();
  } catch (err) {
    return ctx.json(
      {
        message: "Unauthorized",
        error: err instanceof Error ? err.message : String(err),
      },
      401
    );
  }
}
