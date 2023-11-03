import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { InviteUserRequestDto } from './dto/invite-user.dto';
import { Gym } from '../gym/entities/gym.entity';
import { UserStatus } from 'src/enums/user-type-status.enum';
import { EmailService } from 'src/utils/email.service';
export declare class AdminService {
    private userRepository;
    private gymRepository;
    private emailService;
    gymRepositoryRepository: any;
    constructor(userRepository: Repository<User>, gymRepository: Repository<Gym>, emailService: EmailService);
    inviteUser(user: InviteUserRequestDto, source: number): Promise<{
        status: boolean;
        message: string;
    }>;
    updateUserStatusByAdmin(userId: any, status: UserStatus): Promise<{
        status: boolean;
        message: string;
    }>;
    getAdminUserWaitlistDetails(): Promise<{
        status: boolean;
        message: string;
        data: any[];
    }>;
}
