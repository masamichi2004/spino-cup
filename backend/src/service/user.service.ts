import { UserRepo } from "../repository/user.repo";

export class UserService {
    private readonly userRepo: UserRepo;

    constructor() {
        this.userRepo = new UserRepo();
    }

    public bulkGet = async () => {
        return this.userRepo.bulkGet();
    };
}
