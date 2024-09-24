import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { CorsConfig } from "./middleware/cors";
import { UserService } from "./service/user.service";
import { GithubOAuth } from './middleware/github.auth';
import axios from 'axios';
import { User } from "./model/user.model";

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
  const code = c.req.query('code');
  if (!code) return c.text('No code provided', 400);

  try {
    const accessToken = await auth.getAccessToken(code);
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = {
      userId: userResponse.data.login,
      accessToken,
      avatarUrl: userResponse.data.avatar_url,
      name: userResponse.data.name,
      followers: userResponse.data.followers,
      following: userResponse.data.following,
    } as User;
    
    return c.json({
      user: userInfo,
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
