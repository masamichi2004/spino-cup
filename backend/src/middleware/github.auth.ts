import axios from "axios";

export class GithubOAuth {
  private static readonly CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
  private static readonly CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
  private static readonly CALLBACK_URL = process.env.GITHUB_CALLBACK_URL!;

  private getGithubOAuthURL = () => {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      redirect_uri: process.env.GITHUB_CALLBACK_URL!,
      scope: "read:user",
    });
    const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
    return url;
  };

  private getAccessToken = async (code: string) => {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );
    return response.data.access_token;
  };
}
