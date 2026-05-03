import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("wagers", "routes/wagers.tsx")
] satisfies RouteConfig;
