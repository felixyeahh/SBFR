import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("wagers", "routes/wagers.tsx"),
  route("quests", "routes/quests.tsx"),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;
