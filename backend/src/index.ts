import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { CorsConfig } from "./middleware/cors";
import { UserService } from "./service/user.service";
import { GithubOAuth } from "./github/github.auth";
import { Repo } from './github/repository/createRepository';

const app = new Hono();
const service = new UserService();
const auth = new GithubOAuth();
const ACCESS_TOKEN = process.env.PRIVATE_ACCESS_TOKEN || '';
const repo = new Repo(ACCESS_TOKEN);


app.get("/users", async (c) => {
  const users = await service.bulkGet();
  return c.json(users);
});

app.get("/example", (c) => {
  return c.json({
    statusCode: 200,
    body: {
      name: "user12",
      parts: [
        {
          part: "chest",
          trainings: [
            {
              training: "bench_press",
              reps: 10,
              sets: 4,
              weight: 100,
            },
            {
              training: "incline_press",
              reps: 12,
              sets: 3,
              weight: 80,
            },
          ],
          pulls: [
            {
              id: 1,
              title: "Increase bench press weight",
              description: "Increased the weight from 90kg to 100kg",
              status: "open",
              created_at: "2024-09-24T12:34:56Z",
              updated_at: "2024-09-24T13:00:00Z",
            },
            {
              id: 2,
              title: "Change incline press reps",
              description: "Reduced reps from 15 to 12",
              status: "merged",
              created_at: "2024-09-20T10:00:00Z",
              updated_at: "2024-09-22T14:30:00Z",
            },
          ],
        },
        {
          part: "legs",
          trainings: [
            {
              training: "squat",
              reps: 8,
              sets: 4,
              weight: 120,
            },
            {
              training: "leg_press",
              reps: 12,
              sets: 3,
              weight: 200,
            },
          ],
          pulls: [
            {
              id: 1,
              title: "Increase squat depth",
              description: "Changed form to increase depth during squats",
              status: "open",
              created_at: "2024-09-24T09:00:00Z",
              updated_at: "2024-09-24T10:30:00Z",
            },
          ],
        },
      ],
    },
  });
})

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
    return c.json(user);
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

const port = 8080;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
