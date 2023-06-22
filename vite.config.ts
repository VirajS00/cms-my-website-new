import solid from "solid-start/vite";
import { defineConfig } from "vite";
import dotenv from "dotenv";
import vercel from "solid-start-vercel";

export default defineConfig(() => {
  dotenv.config();

  return {
    plugins: [
      solid({
        adapter: vercel({
          edge: false,
        }),
      }),
    ],
  };
});
