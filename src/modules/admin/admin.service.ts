import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { UserType } from 'src/enums/user-type.enum';
import { InviteUserRequestDto } from './dto/invite-user.dto';
import { GymStatus } from 'src/enums/gym-type-status.enum';
import { Gym } from '../gym/entities/gym.entity';
import { SourceType } from 'src/enums/source-type.enum';
import { UserStatus } from 'src/enums/user-type-status.enum';
import { EmailService } from 'src/utils/email.service';
@Injectable()
export class AdminService {
  gymRepositoryRepository: any;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Gym)
    private gymRepository: Repository<Gym>,
    private emailService: EmailService,
  ) {}

  async inviteUser(user: InviteUserRequestDto, source: number) {
    try {
      const existedAdminData = await this.userRepository.findOne({
        where: [{ emailId: user.emailId }],
      });

      if (existedAdminData) {
        throw new ConflictException('User already exist!');
      }

      const createdUser = this.userRepository.create(user);

      createdUser.source = SourceType[source];
      createdUser.userStatus = UserStatus.Invited;
      const savedUser = await this.userRepository.save(createdUser);

      if (savedUser.userType === UserType.Gym) {
        const gymCreatedUser = await this.gymRepository.create({
          user: createdUser,
          status: GymStatus.Invited,
        });
        const createdGym = await this.gymRepository.save(gymCreatedUser);
        createdUser['GymId'] = createdGym.id;
      }
      this.emailService.sendInviteMail(user.emailId, user.fullName);

      return {
        status: true,
        message: 'User invited successfully',
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async updateUserStatusByAdmin(userId: any, status: UserStatus) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['gyms'],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const newStatus =
        status === UserStatus.Unverified &&
        user.source !== SourceType[SourceType.Self]
          ? UserStatus.Approved
          : status;

      const curstatus =
        user.userType === UserType.Gym ? user.gyms[0].status : user.userStatus;

      if (curstatus === UserStatus.Pending) {
        user.userStatus = newStatus;
        await this.userRepository.save(user);
        if (user.userType === UserType.Gym) {
          await this.gymRepository.update(
            {
              user: user,
            },
            {
              status: newStatus,
            },
          );
        }
        user.userStatus === UserStatus.Declined
          ? this.emailService.sendRejectionMail(user.emailId, user.fullName)
          : this.emailService.sendApprovalMail(user.emailId, user.fullName);

        return {
          status: true,
          message: `Action taken successfully!`,
        };
      } else {
        const newStatus =
          status === UserStatus.Unverified
            ? UserStatus[UserStatus.Approved]
            : UserStatus[user.userStatus];
        throw new BadRequestException(`User has already been ${newStatus}!`);
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async getAdminUserWaitlistDetails() {
    try {
      const userStatusValues = [
        UserStatus.Pending,
        UserStatus.Declined,
        UserStatus.Invited,
      ];
      const otherUsers = await this.userRepository
        .createQueryBuilder('users')
        .select(['users.id'])
        .addSelect('full_name', 'fullName')
        .addSelect('email_id', 'emailId')
        .addSelect(
          `CASE when user_status=300 then 'Rejected' when user_status=400 then 'Invited' else 'Pending' end  `,
          'userStatus',
        )
        .addSelect('phone_number', 'phoneNumber')
        .addSelect(
          ` CASE when user_type=100 then 'Fitness Studio' else 'User' end`,
          'userType',
        )
        .addSelect(
          ` CASE when source=100 then 'Self' when source=200 then 'Invited' else '' end`,
          'source',
        )
        .leftJoin('users.gyms', 'gym')
        .where(
          '(user_type=300 and user_status in (:...statuses)) or  (user_type = 100 and user_status in (:...statuses))',
          {
            statuses: userStatusValues,
          },
        )
        .orderBy('user_status', 'DESC')
        .addOrderBy('users.id', 'ASC')
        .getRawMany();

      const approvedUsers = await this.userRepository
        .createQueryBuilder('users')
        .select(['users.id'])
        .addSelect('full_name', 'fullName')
        .addSelect('email_id', 'emailId')
        .addSelect(`'${UserStatus[UserStatus.Approved]}'`, 'userStatus')
        .addSelect('phone_number', 'phoneNumber')
        .addSelect(
          ` CASE when user_type=100 then 'Fitness Studio' else 'User' end`,
          'userType',
        )
        .addSelect(
          ` CASE when source=100 then 'Self' when source=200 then 'Invited' else '' end`,
          'source',
        )
        .leftJoin('users.gyms', 'gym')
        .where(
          '(user_type=300 and user_status in (:...statuses)) or  (user_type = 100 and user_status in (:...statuses))',
          {
            statuses: [UserStatus.Approved, UserStatus.Unverified],
          },
        )
        .orderBy('users.id', 'ASC')
        .getRawMany();

      if (!approvedUsers && !otherUsers) {
        throw new NotFoundException('No Record found');
      }
      return {
        status: true,
        message: 'User data fetched successfully!',
        data: [...otherUsers, ...approvedUsers],
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
