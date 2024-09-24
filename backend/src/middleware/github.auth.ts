import { Hono } from 'hono';
import axios from 'axios';

export function getGitHubOAuthURL() {
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        redirect_uri: process.env.GITHUB_CALLBACK_URL!,
        scope: 'read:user',
    });
    return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

export async function getAccessToken(code: string) {
    const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
            client_id: process.env.GITHUB_CLIENT_ID!,
            client_secret: process.env.GITHUB_CLIENT_SECRET!,
            code,
        },
        {
            headers: { Accept: 'application/json' },
        }
    );
    return response.data.access_token;
}
