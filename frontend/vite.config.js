import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        onProxyReq: (proxyReq, req, res) => {
          console.log("Proxying request:", req.url);
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log("Received response:", proxyRes.statusCode);
        },
        onError: (err, req, res) => {
          console.error("Proxy error:", err);
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end("Proxy error occurred.");
        },
      },
    },
  },
});

