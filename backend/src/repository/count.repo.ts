import { FirestoreConfig } from "../middleware/firebase.config";
import {
  Firestore,
  getDoc,
  doc,
  runTransaction,
  CollectionReference,
  DocumentData,
  collection,
} from "firebase/firestore";

export class CommitCount {
  private readonly firestore: FirestoreConfig;
  private readonly db: Firestore;
  private readonly clc: CollectionReference<DocumentData>;

  constructor() {
    this.firestore = new FirestoreConfig();
    this.db = this.firestore.db;
    this.clc = collection(this.db, "User");
  }

  public checkDateKey = async (
    userId: string,
    dateKey: string
  ): Promise<boolean> => {
    const docRef = doc(this.clc, userId);

    try {
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      const commitField = data?.commit || {};

      return dateKey in commitField;
    } catch (error) {
      console.error("Error checking dateKey existence:", error);
      throw error;
    }
  };

  public count = async (userId: string, dateKey: string): Promise<void> => {
    const docRef = doc(this.clc, userId);

    try {
      await runTransaction(this.db, async (transaction) => {
        const docSnap = await transaction.get(docRef);
        const data = docSnap.data();
        const commitField = data?.commit || {};
        const currentCommitCount = commitField[dateKey];
        const newCommitCount = currentCommitCount + 1;
        transaction.update(docRef, {
          [`commit.${dateKey}`]: newCommitCount,
        });
      });
    } catch (error) {
      console.error("commit 数の更新中にエラーが発生しました: ", error);
      throw error;
    }
  };

  public create = async (
    userId: string,
    dateKey: string
  ): Promise<void> => {
    const docRef = doc(this.clc, userId);
  
    try {
      await runTransaction(this.db, async (transaction) => {
        const docSnap = await transaction.get(docRef);
        const data = docSnap.data();
        const commitField = data?.commit || {};

        commitField[dateKey] = 1;
        transaction.update(docRef, { commit: commitField });
      });
    } catch (error) {
      console.error("初期 commit 数の設定中にエラーが発生しました: ", error);
      throw error;
    }
  };
}
