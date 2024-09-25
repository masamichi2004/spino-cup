import fetch from "node-fetch";
import "dotenv/config";
import { Repository } from "../model/repository.model";

const GITHUB_API_URL = "https://api.github.com";

export class GithubRepo {
  private accessToken: string;

  constructor(accessToken: string) {
    if (!accessToken) {
      throw new Error("GitHub Access Token が設定されていません。");
    }
    this.accessToken = accessToken;
  }

  public async create(repoName: string): Promise<Repository> {
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

  // public async getDirs(
  //   userId: string,
  //   repoName: string,
  //   filePath?: string
  // ): Promise<string[]> {
  //   const url = `${GITHUB_API_URL}/repos/${userId}/${repoName}/contents/${filePath}`;
  //   console.log(url);
  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${this.accessToken}`,
  //     },
  //   });
  //   console.log(response);

  //   return [];
  // }

  public async commit(
    userId: string,
    repo: string,
    dirName: string,
    jsonData: object,
    message: string
  ) {
    const date = new Date();
    const file = `${dirName}-` + date.toISOString().split("T")[0];
    const fileContent = JSON.stringify(jsonData, null, 2);
    const encodedContent = Buffer.from(fileContent).toString("base64");
    const url = `https://api.github.com/repos/${userId}/${repo}/contents/${dirName}/${file}.json`;

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
        console.log(`File ${file} added successfully to the repository.`);
      } else {
        const errorData = await response.json();
        console.error("Failed to add file:", errorData);
      }
    } catch (error) {
      console.error("Error adding file:", error);
    }
  }
}
