import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";

import { config } from "./src/config/config";

// https://vitejs.dev/config/
export default defineConfig({
    base: config.base,
    plugins: [react(), eslint()],
});
