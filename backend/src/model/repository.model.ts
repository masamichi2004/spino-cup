import { DocumentReference } from "firebase/firestore";
import { FirestoreService } from "../lib/firestore.tool";

export interface Repository {
  repositoryId: string;
  name: string;
  description: string;
}
