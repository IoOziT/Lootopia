import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // AUTH
  route("register", "routes/auth/register.tsx"),
  route("login", "routes/auth/login.tsx"),

  // HUNT
  route("hunt", "routes/chasse/chasseDisponible.tsx"),
  route("hunt/create", "routes/chasse/createChasse.tsx"),
  route("hunt/:id", "routes/chasse/detailsChasse.tsx"),
] satisfies RouteConfig;
