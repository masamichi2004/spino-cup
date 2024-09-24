import { FirestoreConfig } from "../lib/firebase.config";
import { Firestore, collection, getDocs } from "firebase/firestore";

export class UserRepo {
    private readonly firestore: FirestoreConfig;

    constructor() {
        this.firestore = new FirestoreConfig();
    }

    public bulkGet = async () => {
        try {
            const collectionRef = collection(this.firestore.db, "user");
            const snapshot = await getDocs(collectionRef);
            const users = snapshot.docs.map((doc) => doc.data());
            return users;
        } catch (e) {
            console.error(e);
            return [];
        }
    };
}
