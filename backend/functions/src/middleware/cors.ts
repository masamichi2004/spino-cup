import { cors } from "hono/cors";

export class CorsConfig {
  static readonly policy = cors({
    origin: [
      "http://localhost:3000",
      "https://spino-cup.vercel.app",
      "https://github.com",
      "https://api.github.com",
      "https://default-1018624218403.asia-northeast1.run.app",
    ],
    allowHeaders: [
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  });
}
