import { cors } from "hono/cors";

export class CorsConfig {
  static readonly policy = cors({
    origin: ["http://localhost:3000", "https://spino-cup.vercel.app/home"],
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  });
}
