import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import contextualDataPlugin from "./plugins/contextual-data.ts";

export default defineConfig({
  plugins: [tailwind(), contextualDataPlugin()],
});
