import { FirestoreService } from "../lib/firestore.tool"; 

export class RepositoryRepo {
  private readonly firestore: FirestoreService;

  constructor() {
    this.firestore = new FirestoreService("Repository");
  }

  public bulkGet = async () => { 
    return this.firestore.bulkGet();
  }
}