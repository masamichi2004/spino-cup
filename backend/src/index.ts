import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { CorsConfig } from "./middleware/cors";
import { db } from "./lib/firebase.config";

const app = new Hono();

const ;

app.use("/*", CorsConfig.policy);

app.get("/", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

const port = 8080;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
