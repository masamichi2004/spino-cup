import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { CorsConfig } from "./middleware/cors";
import { UserService } from "./service/user.service";
import { GithubOAuth } from "./api/auth.github";
import { Repo } from "./api/repository.github";

const app = new Hono();
const service = new UserService();
const auth = new GithubOAuth();

app.use("/*", CorsConfig.policy);

const port = 8080;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

app.get("/users", async (c) => {
  const users = await service.bulkGet();
  return c.json(users);
});

app.get("/", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

app.get("/auth/github", (c) => {
  return c.redirect(auth.getGithubOAuthURL());
});

app.get("/auth/github/callback", async (c) => {
  try {
    const user = await auth.validate(c);
    await service.create(user);
    return c.redirect(`http://localhost:3000/home/${user.userId}`);
  } catch (e) {
    throw e;
  }
});

app.get("/user/:userId", async (c) => {
  const userId = c.req.param("userId");
  const user = await service.get(userId);
  return c.json(user);
});

app.post("/create/repo", async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.text("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return c.text("Unauthorized", 401);
  }
  const repo = new Repo(token);

  const { repoName, githubId } = await c.req.json();

  const repoData = await repo.createRepo(repoName as string);
  if (!repoData) {
    return c.text("Failed to create a repository", 500);
  }

  return c.redirect(`http://localhost:3000/home/${githubId}/${repoName}`);
});

app.post("/commit", async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.text("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return c.text("Unauthorized", 401);
  }

  const repo = new Repo(token);

  const { userId, repoName, dirName, jsonData, commitMessage } =
    await c.req.json();
  await repo.commit(userId, repoName, dirName, jsonData, commitMessage);

  return c.json({message: 'success', status_code: 200});
});
