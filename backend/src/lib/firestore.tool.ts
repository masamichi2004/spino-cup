import { FirestoreConfig } from "../middleware/firebase.config";
import {
  CollectionReference,
  DocumentData,
  collection,
  getDocs,
  addDoc,
  Firestore,
} from "firebase/firestore";

export class FirestoreService {
  private readonly firestore: FirestoreConfig;
  private readonly db: Firestore
  private readonly clc: CollectionReference<DocumentData, DocumentData>;

  constructor(collectionName: string) {
    this.firestore = new FirestoreConfig();
    this.db = this.firestore.db;
    this.clc = collection(this.db, collectionName);
  }

  public bulkGet = async () => {
    try {
      const snapshot = await getDocs(this.clc);
      const data = snapshot.docs.map((doc) => doc.data()) as DocumentData[];
      return data;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  public create = async (data: DocumentData) => {
    try {
      await addDoc(this.clc, data);
    } catch (e) {
      return Response.json({ message: `Failed to create user: ${e}` , status_code: 500 });
    }
  };
}
