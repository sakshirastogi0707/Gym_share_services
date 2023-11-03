"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entity/user.entity");
const user_type_enum_1 = require("../../enums/user-type.enum");
const gym_type_status_enum_1 = require("../../enums/gym-type-status.enum");
const gym_entity_1 = require("../gym/entities/gym.entity");
const source_type_enum_1 = require("../../enums/source-type.enum");
const user_type_status_enum_1 = require("../../enums/user-type-status.enum");
const email_service_1 = require("../../utils/email.service");
let AdminService = class AdminService {
    constructor(userRepository, gymRepository, emailService) {
        this.userRepository = userRepository;
        this.gymRepository = gymRepository;
        this.emailService = emailService;
    }
    async inviteUser(user, source) {
        try {
            const existedAdminData = await this.userRepository.findOne({
                where: [{ emailId: user.emailId }],
            });
            if (existedAdminData) {
                throw new common_1.ConflictException('User already exist!');
            }
            const createdUser = this.userRepository.create(user);
            createdUser.source = source_type_enum_1.SourceType[source];
            createdUser.userStatus = user_type_status_enum_1.UserStatus.Invited;
            const savedUser = await this.userRepository.save(createdUser);
            if (savedUser.userType === user_type_enum_1.UserType.Gym) {
                const gymCreatedUser = await this.gymRepository.create({
                    user: createdUser,
                    status: gym_type_status_enum_1.GymStatus.Invited,
                });
                const createdGym = await this.gymRepository.save(gymCreatedUser);
                createdUser['GymId'] = createdGym.id;
            }
            this.emailService.sendInviteMail(user.emailId, user.fullName);
            return {
                status: true,
                message: 'User invited successfully',
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Something went wrong!');
        }
    }
    async updateUserStatusByAdmin(userId, status) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ['gyms'],
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const newStatus = status === user_type_status_enum_1.UserStatus.Unverified &&
                user.source !== source_type_enum_1.SourceType[source_type_enum_1.SourceType.Self]
                ? user_type_status_enum_1.UserStatus.Approved
                : status;
            const curstatus = user.userType === user_type_enum_1.UserType.Gym ? user.gyms[0].status : user.userStatus;
            if (curstatus === user_type_status_enum_1.UserStatus.Pending) {
                user.userStatus = newStatus;
                await this.userRepository.save(user);
                if (user.userType === user_type_enum_1.UserType.Gym) {
                    await this.gymRepository.update({
                        user: user,
                    }, {
                        status: newStatus,
                    });
                }
                user.userStatus === user_type_status_enum_1.UserStatus.Declined
                    ? this.emailService.sendRejectionMail(user.emailId, user.fullName)
                    : this.emailService.sendApprovalMail(user.emailId, user.fullName);
                return {
                    status: true,
                    message: `Action taken successfully!`,
                };
            }
            else {
                const newStatus = status === user_type_status_enum_1.UserStatus.Unverified
                    ? user_type_status_enum_1.UserStatus[user_type_status_enum_1.UserStatus.Approved]
                    : user_type_status_enum_1.UserStatus[user.userStatus];
                throw new common_1.BadRequestException(`User has already been ${newStatus}!`);
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Something went wrong!');
        }
    }
    async getAdminUserWaitlistDetails() {
        try {
            const userStatusValues = [
                user_type_status_enum_1.UserStatus.Pending,
                user_type_status_enum_1.UserStatus.Declined,
                user_type_status_enum_1.UserStatus.Invited,
            ];
            const otherUsers = await this.userRepository
                .createQueryBuilder('users')
                .select(['users.id'])
                .addSelect('full_name', 'fullName')
                .addSelect('email_id', 'emailId')
                .addSelect(`CASE when user_status=300 then 'Rejected' when user_status=400 then 'Invited' else 'Pending' end  `, 'userStatus')
                .addSelect('phone_number', 'phoneNumber')
                .addSelect(` CASE when user_type=100 then 'Fitness Studio' else 'User' end`, 'userType')
                .addSelect(` CASE when source=100 then 'Self' when source=200 then 'Invited' else '' end`, 'source')
                .leftJoin('users.gyms', 'gym')
                .where('(user_type=300 and user_status in (:...statuses)) or  (user_type = 100 and user_status in (:...statuses))', {
                statuses: userStatusValues,
            })
                .orderBy('user_status', 'DESC')
                .addOrderBy('users.id', 'ASC')
                .getRawMany();
            const approvedUsers = await this.userRepository
                .createQueryBuilder('users')
                .select(['users.id'])
                .addSelect('full_name', 'fullName')
                .addSelect('email_id', 'emailId')
                .addSelect(`'${user_type_status_enum_1.UserStatus[user_type_status_enum_1.UserStatus.Approved]}'`, 'userStatus')
                .addSelect('phone_number', 'phoneNumber')
                .addSelect(` CASE when user_type=100 then 'Fitness Studio' else 'User' end`, 'userType')
                .addSelect(` CASE when source=100 then 'Self' when source=200 then 'Invited' else '' end`, 'source')
                .leftJoin('users.gyms', 'gym')
                .where('(user_type=300 and user_status in (:...statuses)) or  (user_type = 100 and user_status in (:...statuses))', {
                statuses: [user_type_status_enum_1.UserStatus.Approved, user_type_status_enum_1.UserStatus.Unverified],
            })
                .orderBy('users.id', 'ASC')
                .getRawMany();
            if (!approvedUsers && !otherUsers) {
                throw new common_1.NotFoundException('No Record found');
            }
            return {
                status: true,
                message: 'User data fetched successfully!',
                data: [...otherUsers, ...approvedUsers],
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Something went wrong!');
        }
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(gym_entity_1.Gym)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map