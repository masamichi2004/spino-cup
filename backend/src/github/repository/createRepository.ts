import fetch from 'node-fetch';
import 'dotenv/config';
import { Repository } from "../../model/repository.model"

const GITHUB_API_URL = 'https://api.github.com';




export class Repo {
    private accessToken: string;

    constructor(accessToken: string) {
        if (!accessToken) {
            throw new Error('GitHub Access Token が設定されていません。');
        }
        this.accessToken = accessToken;
    }

    public async createRepo(repoName: string): Promise<Repository> {
        const headers = {
            'Authorization': `Bearer ${this.accessToken}`,
        };
        const body = JSON.stringify({
            name: repoName
        });
        const response = await fetch(`${GITHUB_API_URL}/user/repos`, {
            method: 'POST',
            headers: headers,
            body: body,
        });
        const repoData = await response.json() as Repository;
        return repoData;
    };

    public async createDir(
        userId: string,
        repo: string,
        path: string,
        commitMessage: string,
        readmeContent: string
    ): Promise<void> {
        const headers = {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
        };
        const content = Buffer.from(readmeContent).toString('base64');
        const body = JSON.stringify({
            message: commitMessage,
            content: content,
        });
        const response = await fetch(
            `https://api.github.com/repos/${userId}/${repo}/contents/${path}/README.md`,
            {
                method: 'PUT',
                headers: headers,
                body: body
            }
        );
    }
}