import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { MiddlewareConfig } from "./middleware/middleware.config";

const app = new Hono();

app.use("/*", MiddlewareConfig.corsPolicy);

app.get("/", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

const port = 8080;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
