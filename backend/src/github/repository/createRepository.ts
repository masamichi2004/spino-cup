import fetch from "node-fetch";
import "dotenv/config";
import { Repository } from "../../model/repository.model";

const GITHUB_API_URL = "https://api.github.com";

export class Repo {
  private accessToken: string;

  constructor(accessToken: string) {
    if (!accessToken) {
      throw new Error("GitHub Access Token が設定されていません。");
    }
    this.accessToken = accessToken;
  }

  public async createRepo(repoName: string): Promise<Repository> {
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };
    const body = JSON.stringify({
      name: repoName,
    });
    const response = await fetch(`${GITHUB_API_URL}/user/repos`, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const repoData = (await response.json()) as Repository;
    return repoData;
  }

  public async createDir(
    userId: string,
    repo: string,
    path: string,
    commitMessage: string,
    readmeContent: string
  ): Promise<void> {
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };
    const content = Buffer.from(readmeContent).toString("base64");
    const body = JSON.stringify({
      message: commitMessage,
      content: content,
    });
    const response = await fetch(
      `https://api.github.com/repos/${userId}/${repo}/contents/${path}/README.md`,
      {
        method: "PUT",
        headers: headers,
        body: body,
      }
    );
  }

  public async createCommit(
    userId: string,
    repo: string,
    filePath: string,
    jsonData: object,
    message: string
  ) {
    const fileContent = JSON.stringify(jsonData, null, 2);
    const encodedContent = Buffer.from(fileContent).toString("base64");
    const url = `https://api.github.com/repos/${userId}/${repo}/contents/${filePath}`;

    const body = {
      message,
      content: encodedContent,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `token ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log(`File ${filePath} added successfully to the repository.`);
      } else {
        const errorData = await response.json();
        console.error("Failed to add file:", errorData);
      }
    } catch (error) {
      console.error("Error adding file:", error);
    }
  }
}
