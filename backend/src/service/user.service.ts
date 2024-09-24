import { UserRepo } from "../repository/user.repo";

export class UserService {
  private readonly userRepo: UserRepo;

  constructor() {
    this.userRepo = new UserRepo();
  }

  public GET = async () => {
    return this.userRepo.GET();
  };
}
