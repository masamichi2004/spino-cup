import { cors } from "hono/cors";

export class MiddlewareConfig {
  static readonly corsPolicy = cors({
    origin: ["http://localhost:3000"],
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  });
}
