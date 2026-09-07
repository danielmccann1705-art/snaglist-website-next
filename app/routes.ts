import { index, route, type RouteConfig } from "@react-router/dev/routes";
import { pages } from "./content/pages";
export default [
  index("routes/public.tsx", { id: "home" }),
  ...Object.keys(pages)
    .filter((path) => path !== "/")
    .map((path) =>
      route(path.slice(1), "routes/public.tsx", { id: path.slice(1) }),
    ),
  route("m/:token/*", "routes/contractor.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
