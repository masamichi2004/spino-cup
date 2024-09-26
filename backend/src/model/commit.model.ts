export interface Commit {
  userId: string;
  repo: string;
  dirName: string;
  jsonData: object;
  commitMessage: string;
}

export interface Count {
  userId: string;
  dateKey: string;
}
