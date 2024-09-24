import axios from "axios";
import { User } from "../model/user.model";

export class GithubOAuth {
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly CALLBACK_URL: string;
  constructor() {
    this.CLIENT_ID = process.env.GITHUB_CLIENT_ID! as string;
    this.CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET! as string;
    this.CALLBACK_URL = process.env.GITHUB_CALLBACK_URL! as string;
  }

  public getGithubOAuthURL = () => {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      redirect_uri: this.CALLBACK_URL,
      scope: "read:user",
    });
    const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
    return url;
  };

  private getAccessToken = async (code: string) => {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );
    console.log(response.data);
    return response.data.access_token;
  };

  public validate = async (c: any): Promise<User> => {
    const code = c.req.query("code");
    if (!code) return c.text("No code provided", 400);
    try {
      const accessToken = await this.getAccessToken(code);
      const userResponse = await axios.get("https://api.github.com/user", {
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
        createdAt: new Date(),
      } as User;

      return userInfo;
    } catch (error) {
      throw error;
    }
  };
}
