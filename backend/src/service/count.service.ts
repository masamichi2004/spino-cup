import { CommitCount } from "../repository/count.repo";

export class CommitService {
  private count: CommitCount;

  constructor() {
    this.count = new CommitCount(); 
  }
  public async renew(
    userId: string,
    dateKey: string
  ): Promise<{ [key: string]: number }> {
    try {
      const dateKeyExists = await this.count.checkDateKey(userId, dateKey);
      let updatedCommitField: { [key: string]: number };

      if (dateKeyExists) {
        updatedCommitField = await this.count.count(userId, dateKey);
      } else {
        updatedCommitField = await this.count.create(userId, dateKey);
      }
      return updatedCommitField;
    } catch (error) {
      console.error("Error during increment or create commit:", error);
      throw error;
    }
  }

  public async getCommitField(
    userId: string
  ): Promise<{ [key: string]: number } | null> {
    return await this.count.getCommitField(userId);
  }
}
