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

  public count = async (
    userId: string,
    dateKey: string
  ): Promise<{ [key: string]: number }> => {
    const docRef = doc(this.clc, userId);

    try {
      const updatedCommitField = await runTransaction(
        this.db,
        async (transaction) => {
          const docSnap = await transaction.get(docRef);
          const data = docSnap.data();
          const commitField = data?.commit || {};
          const currentCommitCount = commitField[dateKey];
          const newCommitCount = currentCommitCount + 1;

          commitField[dateKey] = newCommitCount;
          transaction.update(docRef, { commit: commitField });

          return commitField;
        }
      );

      return updatedCommitField; // トランザクションの結果として更新後の commit フィールド全体を返す
    } catch (error) {
      console.error("commit フィールドの更新中にエラーが発生しました: ", error);
      throw error;
    }
  };

  public create = async (
    userId: string,
    dateKey: string
  ): Promise<{ [key: string]: number }> => {
    const docRef = doc(this.clc, userId);

    try {
      const updatedCommitField = await runTransaction(
        this.db,
        async (transaction) => {
          const docSnap = await transaction.get(docRef);

          if (!docSnap.exists()) {
            throw new Error(
              `ユーザー ${userId} のドキュメントが存在しません。`
            );
          }

          const data = docSnap.data();
          const commitField = data?.commit || {};
          commitField[dateKey] = 1;
          transaction.update(docRef, { commit: commitField });

          return commitField;
        }
      );
      return updatedCommitField;
    } catch (error) {
      console.error("初期 commit 数の設定中にエラーが発生しました: ", error);
      throw error;
    }
  };

  public getCommitField = async (
    userId: string
  ): Promise<{ [key: string]: number } | null> => {
    const docRef = doc(this.clc, userId);

    try {
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      const commitField = data?.commit || null;

      return commitField;
    } catch (error) {
      console.error("Error fetching commit field:", error);
      throw error;
    }
  };
}
