import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("shop", "routes/shop/shop.tsx"),
] satisfies RouteConfig;
