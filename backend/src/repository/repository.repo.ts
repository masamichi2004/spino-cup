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
  query,
  getDoc,
  where,
} from "firebase/firestore";

export class RepositoryRepo {
  private readonly firestore: FirestoreConfig;
  private readonly db: Firestore;
  private readonly clc: CollectionReference<DocumentData, DocumentData>;

  constructor() {
    this.firestore = new FirestoreConfig();
    this.db = this.firestore.db;
    this.clc = collection(this.db, "Repository");
  }

  public create = async (repo: DocumentData) => {
    const docRef = doc(this.clc, `${repo.userId}_${repo.name}`);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("同じユーザーとリポジトリ名のデータが既に存在します。");
        return;
      }


      const batch = writeBatch(this.db);
      batch.set(docRef, repo);
      await batch.commit();
      console.log(`リポジトリ ${repo.name} が正常に作成されました。`);
    } catch (error) {
      console.error("エラーが発生しました: ", error);
    }
  };

  public getbyUserId = async (userId: string) => {
    const q = where("userId", "==", userId);
    const repositories = await getDocs(query(this.clc, q));
    if (repositories.empty) {
      return [];
    }

    return repositories.docs.map((doc) => doc.data());
  };
}
