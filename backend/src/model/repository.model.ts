import { DocumentReference } from "firebase/firestore";
import { FirestoreService } from "../lib/firestore.tool";

export interface Repository {
  name: string;
  html_url: string;
}
