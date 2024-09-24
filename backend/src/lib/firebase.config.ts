import { initializeApp, cert } from "firebase-admin/app";
import { FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  credential: cert('../../firebaseCredentials.json'),
}) as FirebaseApp;

export const db = getFirestore(app);
