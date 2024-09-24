import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { CorsConfig } from "./middleware/cors";
import { UserService } from "./service/user.service";
import { getGitHubOAuthURL, getAccessToken } from './middleware/github.auth';
import axios from 'axios';

const app = new Hono();
const service = new UserService();

app.get("/users", async (c) => {
  const users = await service.bulkGet();
  return c.json(users);
});

app.use("/*", CorsConfig.policy);

app.get("/", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

app.get('/auth/github', (c) => {
  return c.redirect(getGitHubOAuthURL());
});

app.get('/auth/github/callback', async (c) => {
  const code = c.req.query('code');
  if (!code) return c.text('No code provided', 400);

  try {
    // アクセストークンを取得
    const accessToken = await getAccessToken(code);

    // アクセストークンを使ってGitHubユーザー情報を取得
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 取得したユーザー情報を全て返す
    return c.json({
      message: 'Authenticated successfully',
      access_token: accessToken,
      user: userResponse.data,
    });
  } catch (error) {
    console.error('Error during authentication:', error);
    return c.text('Authentication failed', 500);
  }
});


const port = 8080;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
