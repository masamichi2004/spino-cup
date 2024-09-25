import { UserRepo } from "../repository/user.repo";
import { User } from "../model/user.model";

export class UserService {
  private readonly userRepo: UserRepo;

  constructor() {
    this.userRepo = new UserRepo();
  }

  public bulkGet = async () => {
    return this.userRepo.bulkGet();
  };

  public create = async (user: User) => {
    return this.userRepo.create(user);
  };
}
