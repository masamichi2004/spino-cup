import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { CorsConfig } from "./middleware/cors";
import { UserService } from "./service/user.service";
import { GithubOAuth } from "./github/github.auth";
import { Repo } from './github/repository/createRepository';

const app = new Hono();
const service = new UserService();
const auth = new GithubOAuth();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '';
const USER_ID = process.env.GITHUB_USER_ID || '';
const repo = new Repo(ACCESS_TOKEN);


app.get("/users", async (c) => {
  const users = await service.bulkGet();
  return c.json(users);
});

app.use("/*", CorsConfig.policy);

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


app.get('/create/repo/:repoName', async (c) => {
  try {
    const repoName = c.req.param('repoName');
    const repoData = await repo.createRepo(repoName);
    return c.json({
      message: `リポジトリ "${repoData.name}" が作成されました。`,
      url: repoData.html_url,
    });
  } catch (e) {
    throw e;
  }
});

app.get('/create/:repoName/:dirName', async (c) => {
  const repoName = c.req.param('repoName');
  const dirName = c.req.param('dirName');

  const commitMessage = 'あああああ';
  const readmeContent = 'あああああ';

  await repo.createDir(
    USER_ID,
    repoName,
    dirName,
    commitMessage,
    readmeContent
  );
  return c.json({
    message: `リポジトリ "${repoName}" のディレクトリ "${dirName}" に README.md が作成されました。`
  });
})

app.post('/commit', async (c) => {
    const { userId, repoName, filePath, jsonData, commitMessage } = await c.req.json();
    await repo.createCommit(userId, repoName, filePath, jsonData, commitMessage);
    return c.json({ message: `File ${filePath} added successfully to the repository.` });
});


const port = 8080;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
