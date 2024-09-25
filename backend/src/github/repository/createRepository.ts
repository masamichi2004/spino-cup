import fetch from 'node-fetch';
import 'dotenv/config';

const GITHUB_API_URL = 'https://api.github.com';


interface RepositoryData {
    name: string;
    html_url: string;
}

export class Repo {
    private accessToken: string;

    constructor(accessToken: string) {
        if (!accessToken) {
            throw new Error('GitHub Access Token が設定されていません。');
        }
        this.accessToken = accessToken;
    }

    public async createRepo(repoName: string): Promise<RepositoryData> {
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
        const repoData = await response.json() as RepositoryData;
        return repoData;
    };

    public async createDir(
        repo: string,
        path: string,
        commitMessage: string,
        readmeContent: string
    ): Promise<void> {
        const headers = {
            'Authorization': `Bearer ${this.accessToken}`,
        };
        
    }
}