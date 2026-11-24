import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { buildJsonLd } from "./scripts/jsonld.mjs";

// `base: "./"` keeps every built asset URL relative, so the same build works
// locally, behind the Arena preview proxy, and under the GitHub Pages project
// sub-path (https://fellow3-1.github.io/Fellow3-1/).

/* Inject the homepage JSON-LD from the content module. The source index.html
   carries only a placeholder, so the FAQ, repository and writing lists cannot
   drift from the copy the page actually renders. `</` is escaped so a future
   string containing "</script>" cannot close the block early. */
const structuredData = {
  name: "f31-structured-data",
  transformIndexHtml(html) {
    const data = JSON.stringify(buildJsonLd(), null, 2).replaceAll("</", "<\\/");
    return html.replace("<!--structured-data-->", () => `<script type="application/ld+json">\n${data}\n    </script>`);
  },
};

export default defineConfig({
  plugins: [react(), structuredData],
  // The production bundle is also copied to /docs so Pages can serve it with
  // "Deploy from a branch → main / docs" (see `npm run build:pages`).
  base: "./",
  // Only scan the real entry — the committed /docs Pages build must not
  // be crawled for dev-time dependency discovery.
  optimizeDeps: {
    entries: ["index.html"],
  },
  server: {
    host: true,
    port: 5173,
    // The Arena preview proxies through a per-sandbox host, so allow any host
    // to reach the local dev server.
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
