import type { Config } from "@react-router/dev/config";
import { pages } from "./app/content/pages";
export default {
  ssr: false,
  prerender: [...Object.keys(pages), "/404"],
  buildDirectory: "build",
} satisfies Config;
