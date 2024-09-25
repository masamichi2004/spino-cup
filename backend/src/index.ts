import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { CorsConfig } from "./middleware/cors";
import { UserService } from "./service/user.service";
import { GithubOAuth } from "./github/github.auth";
import { Repo } from "./github/repository/createRepository";

const app = new Hono();
const service = new UserService();
const auth = new GithubOAuth();
const ACCESS_TOKEN = process.env.PRIVATE_ACCESS_TOKEN || "";
const USER_ID = process.env.GITHUB_USER_ID || "";
const repo = new Repo(ACCESS_TOKEN);

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

  console.log(repoName, githubId);

  const repoData = await repo.createRepo(repoName as string);
  console.log(repoData);
  if (!repoData) {
    return c.text("Failed to create a repository", 500);
  }

  return c.text(`http://localhost:3000/home/${githubId}/${repoName}`);
});

app.post("/create/:repoName/:dirName", async (c) => {
  const repoName = c.req.param("repoName");
  const dirName = c.req.param("dirName");

  const commitMessage = "あああああ";
  const readmeContent = "あああああ";

  await repo.createDir(
    USER_ID,
    repoName,
    dirName,
    commitMessage,
    readmeContent
  );
  return c.json({
    message: `リポジトリ "${repoName}" のディレクトリ "${dirName}" に README.md が作成されました。`,
  });
});
