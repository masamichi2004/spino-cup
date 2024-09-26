import { FirestoreConfig } from "../middleware/firebase.config";
import { User } from "../model/user.model";
import {
  Firestore,
  getDocs,
  doc,
  CollectionReference,
  DocumentData,
  collection,
  addDoc,
  writeBatch,
  runTransaction,
  getDoc,
} from "firebase/firestore";

export class UniqueUserError extends Error {}

export class UserRepo {
  private readonly firestore: FirestoreConfig;
  private readonly db: Firestore;
  private readonly clc: CollectionReference<DocumentData, DocumentData>;

  constructor() {
    this.firestore = new FirestoreConfig();
    this.db = this.firestore.db;
    this.clc = collection(this.db, "User");
  }

  public bulkGet = async () => {
    try {
      const snapshot = await getDocs(this.clc);
      const data = snapshot.docs.map((doc) => doc.data()) as User[];
      return data;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  public create = async (user: User) => {
    const docRef = doc(this.clc, user.userId);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        throw new UniqueUserError();
      }

      const batch = writeBatch(this.db);
      batch.set(docRef, user);
      await batch.commit();
      console.log(`ユーザー ${user.userId} が正常に作成されました。`);
    } catch (error) {
      if (error instanceof UniqueUserError) {
        this.update(user);
      } else {
        throw error;
      }
    }
  };

  public update = async (user: User) => {
    const docRef = doc(this.clc, user.userId);
    const updatedAt = new Date();

    // createAtを排除して更新日のみでuserをinsert
    const { createdAt, ...updatedUser } = user;
    updatedUser.updatedAt = updatedAt; 

    try {
      await runTransaction(this.db, async (transaction) => {
        const docSnap = await transaction.get(docRef);
        if (!docSnap.exists()) {
          throw new Error(`ユーザー ${user.userId} は存在しません。`);
        }

        transaction.update(docRef, updatedUser);
      });
      console.log(`ユーザー ${user.userId} が正常に更新されました。`);
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  public get = async (userId: string) => {
    const docRef = doc(this.clc, userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(`ユーザー ${userId} は存在しません。`);
    }

    return docSnap.data() as User;
  };
}
