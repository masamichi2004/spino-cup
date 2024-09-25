export interface Repository {
  name: string;
  html_url: string;
}

export interface Directory {
  name: string;
  repo: string;
  path: string;
  commitMessage: string;
  readmeContent: string;
}