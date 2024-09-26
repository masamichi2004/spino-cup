import { Hono } from "hono";
import { CorsConfig } from "../middleware/cors";
import { UserService } from "../service/user.service";
import { RepositoryService } from "../service/repository.service";
import { GithubOAuth } from "../api/auth.github";
import { Github } from "../api/github";

const app = new Hono();
const userService = new UserService();
const repoService = new RepositoryService();

const auth = new GithubOAuth();

app.use("/*", CorsConfig.policy);

app.get("/repos/:userId", async (c) => {
  const userId = c.req.param("userId");
  const repos = await repoService.bulkGet(userId);
  return c.json(repos);
});

app.get("/users", async (c) => {
  const users = await userService.bulkGet();
  return c.json(users);
});

app.get("/dirs/:userId/:repoName", async (c) => {
  const repoName = c.req.param("repoName");
  const filePath = c.req.query("path");
  const userId = c.req.param("userId");

  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.text("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return c.text("Unauthorized", 401);
  }
  const git = new Github(token);

  const dirs = await git.getDirs(userId, repoName, filePath);
  if (!dirs.length) {
    throw new Error("Failed to fetch directories");
  }
  return c.json({ dirs });
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
    await userService.create(user);
    return c.redirect(`${process.env.FRONTEND_URL}/home/${user.userId}`);
  } catch (e) {
    throw e;
  }
});

app.get("/user/:userId", async (c) => {
  const userId = c.req.param("userId");
  const user = await userService.get(userId);
  return c.json(user);
});

app.post("/create/repo", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      return c.text("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return c.text("Unauthorized", 401);
    }
    const git = new Github(token);

    const { repoName, githubId } = await c.req.json();

    if (!repoName || !githubId) {
      return c.text("Invalid input", 400);
    }

    const repository = { name: repoName, userId: githubId };
    await repoService.create(repository);

    const repoData = await git.create(repoName);
    if (!repoData) {
      return c.text("Failed to create a repository", 500);
    }

    return c.json({
      redirectUrl: `${process.env.FRONTEND_URL}/home/${githubId}/${repoName}`,
    });
  } catch (error) {
    console.error("Error in /create/repo:", error);
    return c.text("Internal Server Error", 500);
  }
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

  const git = new Github(token);

  const { userId, repoName, dirName, jsonData, commitMessage } =
    await c.req.json();
  await git.commit(userId, repoName, dirName, jsonData, commitMessage);

  return c.json({ message: "success", status_code: 200 });
});

export { app };