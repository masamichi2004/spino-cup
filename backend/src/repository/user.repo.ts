import { FirestoreService } from "../lib/firestore.tool";
import { User } from "../model/user.model";

export class UserRepo {
  private readonly firestore: FirestoreService;

  constructor() {
    this.firestore = new FirestoreService("User");
  }

  public bulkGet = async () => { 
    return this.firestore.bulkGet();
  }

  public create = async (user: User) => {
    return this.firestore.create(user);
  };
}
