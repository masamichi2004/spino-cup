import fetch from 'node-fetch';
import 'dotenv/config';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // ここは後で適切なトークンを設定

type ErrorResponse = {
    message: string;
    documentation_url?: string;
}

type RepositoryData = {
    name: string;
    html_url: string;
    private: boolean;
}

export class CreateRepository {
    // 非公開リポジトリを作成するプライベートメソッド
    private async createRepository(repoName: string): Promise<RepositoryData> {
        if (!GITHUB_TOKEN) {
            throw new Error('GitHub Personal Access Token が設定されていません。');
        }

        const headers = {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        };

        const body = JSON.stringify({
            name: repoName,
            auto_init: true,
            private: true, // 非公開リポジトリとして作成
        });

        // 非同期メソッドなので、await を使用するため async が必要
        const response = await fetch(`${GITHUB_API_URL}/user/repos`, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            const errorData = (await response.json()) as ErrorResponse;
            throw new Error(`GitHub リポジトリの作成に失敗しました: ${errorData.message}\n${errorData.documentation_url ?? ''}`);
        }

        const repoData = (await response.json()) as RepositoryData;
        console.log(`非公開リポジトリ "${repoData.name}" が作成されました。URL: ${repoData.html_url}`);
        return repoData;
    }

    // 指定したリポジトリ内にファイルを作成するプライベートメソッド
    private async createFileInRepository(
        owner: string,
        repo: string,
        path: string,
        content: string
    ): Promise<void> {
        if (!GITHUB_TOKEN) {
            throw new Error('GitHub Personal Access Token が設定されていません。');
        }

        const headers = {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        };

        const body = JSON.stringify({
            message: `Create ${path}`,
            content: Buffer.from(content).toString('base64'), // Base64エンコードされたファイル内容
        });

        const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            const errorData = (await response.json()) as ErrorResponse;
            throw new Error(`ファイル "${path}" の作成に失敗しました: ${errorData.message}\n${errorData.documentation_url ?? ''}`);
        }

        console.log(`ファイル "${path}" が作成されました。`);
    }

    // リポジトリとディレクトリを作成するパブリックメソッド
    public async create(
        repoName: string,
        directories: string[]
    ): Promise<void> {
        try {
            // 修正点: this を使ってクラスのプライベートメソッドを呼び出す
            const repoData = await this.createRepository(repoName);
            const owner = repoData.html_url.split('/')[3];

            // 各ディレクトリにダミーファイルを作成
            for (const dir of directories) {
                const filePath = `${dir}/.gitkeep`;
                // 修正点: this を使ってクラスのプライベートメソッドを呼び出す
                await this.createFileInRepository(owner, repoName, filePath, '');
            }

            console.log(`リポジトリ "${repoName}" に指定されたディレクトリが作成されました。`);
        } catch (error) {
            console.error('リポジトリまたはディレクトリの作成に失敗しました:', error instanceof Error ? error.message : error);
        }
    }
}