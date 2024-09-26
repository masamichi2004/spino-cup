import { DocumentData } from "@google-cloud/firestore";
import { RepositoryRepo } from "../repository/repository.repo";

export class RepositoryService {
  private readonly repositoryRepo: RepositoryRepo;

  constructor() {
    this.repositoryRepo = new RepositoryRepo();
  }

  public create = async (data: DocumentData) => {
    return this.repositoryRepo.create(data);
  };

  public readonly bulkGet  = async (userId: string) => {
    return this.repositoryRepo.getbyUserId(userId);
  };
}
