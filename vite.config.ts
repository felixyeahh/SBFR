import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [devtoolsJson(), tailwindcss(), reactRouter(), mkcert()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: "10.0.0.100",
    port: 5173
  }
});
