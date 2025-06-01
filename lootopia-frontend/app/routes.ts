import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // AUTH
  route("register", "routes/auth/register.tsx"),
  route("login", "routes/auth/login.tsx"),

  // HUNT
  route("hunt/create", "routes/chasse/createChasse.tsx"),
  route("hunt/:id", "routes/chasse/detailsChasse.tsx"),
  route("hunt/:id/step/create", "routes/etape/createEtape.tsx"),
] satisfies RouteConfig;
