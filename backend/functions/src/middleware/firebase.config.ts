import { initializeApp, FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { config } from "dotenv";

config();

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

export class FirestoreConfig {
  private readonly config: FirebaseConfig;
  private readonly app: FirebaseApp;
  public readonly db: Firestore;

  constructor() {
    this.config = {
      apiKey: process.env.APP_FIREBASE_API_KEY as string,
      authDomain: process.env.APP_FIREBASE_AUTH_DOMAIN as string,
      projectId: process.env.APP_FIREBASE_PROJECT_ID as string,
      storageBucket: process.env.APP_FIREBASE_BUCKET as string,
      messagingSenderId: process.env.APP_FIREBASE_MESSAGING_SENDER_ID as string,
      appId: process.env.APP_FIREBASE_APP_ID as string,
      measurementId: process.env.APP_FIREBASE_MEASUREMENT_ID as string,
    };
    this.app = initializeApp(this.config);
    this.db = getFirestore(this.app);
  }
}
