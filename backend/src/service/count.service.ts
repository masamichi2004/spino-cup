import { CommitCount } from "../repository/count.repo";

const count = new CommitCount();

export const renew = async (
  userId: string,
  dateKey: string
): Promise<{ [key: string]: number }> => {
  try {
    const dateKeyExists = await count.checkDateKey(userId, dateKey);
    let updatedCommitField: { [key: string]: number };

    if (dateKeyExists) {
      updatedCommitField = await count.count(userId, dateKey);
    } else {
      updatedCommitField = await count.create(userId, dateKey);
    }
    return updatedCommitField; 
  } catch (error) {
    console.error("Error during increment or create commit:", error);
    throw error;
  }
};
