import { CommitCount } from "../repository/count.repo";

const count = new CommitCount();

export const renew = async (
  userId: string,
  dateKey: string
): Promise<void> => {
  try {
    const dateKeyExists = await count.checkDateKey(userId, dateKey);

    if (dateKeyExists) {
      await count.count(userId, dateKey);
    } else {
      await count.create(userId, dateKey);
    }
  } catch (error) {
    console.error("Error during increment or create commit:", error);
    throw error;
  }
};
