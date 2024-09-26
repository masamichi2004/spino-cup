import "dotenv/config";
import { Repository } from "../model/repository.model";

const GITHUB_API_URL = "https://api.github.com";

type DirectoryItem = {
  name: string;
  type: string;
};

export class Github {
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

  public async getDirs(
    userId: string,
    repoName: string,
    filePath?: string
  ): Promise<DirectoryItem[]> {
    let url: string;

    if (!filePath) {
      url = `${GITHUB_API_URL}/repos/${userId}/${repoName}/contents`;
    } else {
      url = `${GITHUB_API_URL}/repos/${userId}/${repoName}/contents/${filePath}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      const data = (await response.json()) as DirectoryItem[];
      const directories = data.map((item: DirectoryItem) => {
        return { name: item.name, type: item.type } as DirectoryItem;
      });

      return directories;
    } catch (error) {
      console.error("Error fetching directories:", error);
      throw new Error();
    }
  }

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
