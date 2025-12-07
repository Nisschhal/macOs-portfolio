import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

/**
 * 1. import.meta.url gives the absolute path of the current file
 * which is the absolute path of vite.config.ts in this case
 * such as file:///Users/nischalpuri/Projects/portfolio/macOS-portfolio/vite.config.ts
 *
 * 2. fileURLToPath(import.meta.url) gives the path of the directory of the current file
 * such as /Users/nischalpuri/Projects/portfolio/macOS-portfolio/vite.config.ts
 *
 * 3. dirname(fileURLToPath(import.meta.url)) gives the path of the directory of the current file
 * such as /Users/nischalpuri/Projects/portfolio/macOS-portfolio
 *
 * .4 resolve(dirname(fileURLToPath(import.meta.url)), "components") gives the path of the directory of the current file
 * such as /Users/nischalpuri/Projects/portfolio/macOS-portfolio/components
 */

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "#components": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "src/components"
      ),
      "#constants": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "src/constants"
      ),
      "#store": resolve(dirname(fileURLToPath(import.meta.url)), "src/store"),
      "#hoc": resolve(dirname(fileURLToPath(import.meta.url)), "src/hoc"),
    },
  },
})
