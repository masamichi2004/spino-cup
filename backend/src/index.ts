import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { CorsConfig } from "./middleware/cors";
import { UserService } from "./service/user.service";
import { GithubOAuth } from './middleware/github.auth';



const app = new Hono();
const service = new UserService();
const auth = new GithubOAuth();

app.get("/users", async (c) => {
  const users = await service.bulkGet();
  return c.json(users);
});

app.use("/*", CorsConfig.policy);

app.get("/", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

app.get('/auth/github', (c) => {
  return c.redirect(auth.getGithubOAuthURL());
});

app.get('/auth/github/callback', async (c) => {
  return auth.validate(c)
})

const port = 8080;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
