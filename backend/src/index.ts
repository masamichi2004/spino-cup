import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { CorsConfig } from "./middleware/cors";
import { UserService } from "./service/user.service";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";

// Passportの設定
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

const app = new Hono();
const service = new UserService();

app.get("/users", async (c) => {
  const users = await service.bulkGet();
  return c.json(users);
});

app.use("/*", CorsConfig.policy);

// GitHub authentication endpoint
app.get("/auth/github", (c) => {
  return new Promise((resolve) => {
    passport.authenticate("github")(c.req, c.res, (err: any) => {
      if (err) {
        console.error("Authentication Error:", err);
        return resolve(c.json({ error: "Authentication failed" }, 401));
      }
      // This will redirect the user to GitHub for login
      resolve(); // Allow Hono to proceed with the response
    });
  });
});

// Callback processing
app.get("/auth/github/callback", (c) => {
  return new Promise((resolve) => {
    passport.authenticate("github", { failureRedirect: "/" }, (err: any, user: any) => {
      if (err) {
        console.error("Callback Error:", err);
        return resolve(c.redirect("/"));
      }
      if (!user) {
        return resolve(c.redirect("/"));
      }
      // Save user session
      c.req.session.user = user; // Ensure session is set up
      return resolve(c.redirect("/")); // Redirect after successful authentication
    })(c.req, c.res);
  });
});


// ホームエンドポイント
app.get("/", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

const port = 8080;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
