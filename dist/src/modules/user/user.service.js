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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const experience_level_enum_1 = require("../../enums/experience-level.enum");
const user_category_subcategory_entity_1 = require("./entity/user.category.subcategory.entity");
const step_name_enum_1 = require("../../enums/step-name.enum");
const gym_entity_1 = require("../gym/entities/gym.entity");
const user_type_enum_1 = require("../../enums/user-type.enum");
const gym_type_status_enum_1 = require("../../enums/gym-type-status.enum");
const transformUserData_utils_1 = require("../../utils/transformUserData.utils");
const user_type_status_enum_1 = require("../../enums/user-type-status.enum");
const email_service_1 = require("../../utils/email.service");
const firebase_utils_1 = require("../../utils/firebase.utils");
let UserService = class UserService {
    constructor(userRepository, gymRepository, userCategorySubCategoryRepository, emailService) {
        this.userRepository = userRepository;
        this.gymRepository = gymRepository;
        this.userCategorySubCategoryRepository = userCategorySubCategoryRepository;
        this.emailService = emailService;
    }
    async createUser(user, firebase_uuid) {
        const existingEmailUser = await this.userRepository.findOne({
            where: [{ emailId: user.emailId, firebaseUuid: firebase_uuid }],
        });
        if (existingEmailUser) {
            if ([user_type_status_enum_1.UserStatus.Pending].includes(existingEmailUser.userStatus)) {
                throw new common_1.UnauthorizedException(`Your account is pending for approval . Please contact our sales representative.`);
            }
            if (existingEmailUser.userStatus !== user_type_status_enum_1.UserStatus.Unverified) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        const userEntity = existingEmailUser
            ? existingEmailUser
            : this.userRepository.create(Object.assign(Object.assign({}, user), { firebaseUuid: firebase_uuid, userStatus: user_type_status_enum_1.UserStatus.Approved }));
        userEntity.userStatus = user_type_status_enum_1.UserStatus.Approved;
        userEntity.phoneNumber = user.phoneNumber;
        const createdUser = await this.userRepository.save(userEntity);
        if (!createdUser) {
            throw new common_1.NotFoundException('Failed to create user');
        }
        if (createdUser.userType === user_type_enum_1.UserType.Gym) {
            const gymEntity = this.gymRepository.create({
                user: createdUser,
                status: gym_type_status_enum_1.GymStatus.Approved,
            });
            const createdGym = await this.gymRepository.save(gymEntity);
            createdUser['GymId'] = createdGym.id;
        }
        return Object.assign(Object.assign({}, createdUser), { userType: user_type_enum_1.UserType[createdUser.userType], userStatus: user_type_status_enum_1.UserStatus[createdUser.userStatus] });
    }
    async getUserProfile(user) {
        const userData = await this.userRepository.findOne({
            where: [{ id: user.id }],
            relations: [
                'userCategorySubcategories',
                'userCategorySubcategories.category',
                'userCategorySubcategories.subcategory',
            ],
        });
        const transformedData = await (0, transformUserData_utils_1.transformUserData)(userData);
        return {
            status: true,
            message: 'Guest user profile details',
            data: transformedData,
        };
    }
    async getUser(firebase_uuid, email_id) {
        try {
            const user = await this.userRepository.findOne({
                where: [
                    { firebaseUuid: firebase_uuid, emailId: email_id, isActive: true },
                ],
                relations: ['gyms'],
            });
            if (!user || user == undefined)
                throw new common_1.NotFoundException();
            return user;
        }
        catch (error) {
            if (error.response.statusCode === common_1.HttpStatus.NOT_FOUND)
                throw new common_1.NotFoundException('User not found!');
            throw new common_1.InternalServerErrorException('Server Error!');
        }
    }
    async getUserByFirebaseId(firebase_uuid) {
        try {
            const user = await this.userRepository.findOne({
                where: [{ firebaseUuid: firebase_uuid }],
            });
            if (!user || user == undefined)
                throw new common_1.NotFoundException();
            return user;
        }
        catch (error) {
            if (error.response.statusCode === common_1.HttpStatus.NOT_FOUND)
                throw new common_1.NotFoundException('User not found!');
            throw new common_1.InternalServerErrorException('Server Error!');
        }
    }
    async deleteUser(users) {
        const { id } = users;
        const user = await this.userRepository.findOne({
            where: [{ id: id, isActive: true }],
        });
        user.isActive = false;
        user.deletedAt = new Date();
        await user.save();
        if (user.userType === user_type_enum_1.UserType.Gym) {
            const gym = await this.gymRepository.findOne({ user: id });
            gym.status = gym_type_status_enum_1.GymStatus.Deactivated;
            gym.save();
        }
        return { status: true, message: 'User soft deleted successfully!' };
    }
    async updateUserProfileBasic(userProfileData, firebase_uuid) {
        const user = await this.userRepository.findOne({
            where: [{ firebaseUuid: firebase_uuid, isActive: true }],
        });
        if (!user) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'User not found',
            });
        }
        const response = await this.userRepository.update({ firebaseUuid: String(firebase_uuid) }, {
            stepName: user.userStatus === user_type_status_enum_1.UserStatus.Onboarded
                ? user.stepName
                : step_name_enum_1.StepName.FULLNAME,
            emailId: userProfileData.emailId,
            fullName: userProfileData.fullName,
            birthDate: userProfileData.birthDate,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
                status: true,
                message: 'Failed to update profile',
            });
        }
        const updatedUser = await this.userRepository.findOne({
            firebaseUuid: String(firebase_uuid),
        });
        return {
            status: true,
            message: 'Profile updated successfully',
            stepName: updatedUser.stepName,
            data: {
                fullName: updatedUser.fullName,
                emailId: updatedUser.emailId,
                birthDate: updatedUser.birthDate,
            },
        };
    }
    async updateUserProfilePic(userProfileData, firebase_uuid) {
        const user = await this.userRepository.findOne({
            where: [{ firebaseUuid: firebase_uuid, isActive: true }],
        });
        if (!user) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'User not found',
            });
        }
        const response = await this.userRepository.update({ firebaseUuid: String(firebase_uuid) }, {
            stepName: user.userStatus === user_type_status_enum_1.UserStatus.Onboarded
                ? user.stepName
                : step_name_enum_1.StepName.PROFILE,
            profilePic: userProfileData.profilePic,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
                status: true,
                message: 'Failed to update profile',
            });
        }
        const updatedUser = await this.userRepository.findOne({
            firebaseUuid: String(firebase_uuid),
        });
        return {
            status: true,
            message: 'Profile updated successfully',
            stepName: updatedUser.stepName,
            data: {
                profilePic: updatedUser.profilePic,
            },
        };
    }
    async updateUserProfileFitnessLevel(userProfileData, firebase_uuid) {
        const user = await this.userRepository.findOne({
            where: [{ firebaseUuid: firebase_uuid, isActive: true }],
        });
        if (!user) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'User not found',
            });
        }
        if (userProfileData.experienceLevel &&
            Object.values(experience_level_enum_1.ExperienceLevel).some((level) => level.toString() === userProfileData.experienceLevel)) {
            user.experienceLevel =
                userProfileData.experienceLevel;
            user.stepName = step_name_enum_1.StepName.EXPERIENCE;
        }
        else {
            throw new common_1.BadRequestException('Invalid experience level');
        }
        const response = await this.userRepository.update({ firebaseUuid: String(firebase_uuid) }, {
            stepName: user.userStatus === user_type_status_enum_1.UserStatus.Onboarded
                ? user.stepName
                : step_name_enum_1.StepName.EXPERIENCE,
            experienceLevel: userProfileData.experienceLevel,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
                status: true,
                message: 'Failed to update profile',
            });
        }
        const updatedUser = await this.userRepository.findOne({
            firebaseUuid: String(firebase_uuid),
        });
        return {
            status: true,
            message: 'Profile updated successfully',
            stepName: updatedUser.stepName,
            data: {
                experienceLevel: updatedUser.experienceLevel,
            },
        };
    }
    async updateUserProfileMedicalHistory(userProfileData, firebase_uuid) {
        const user = await this.userRepository.findOne({
            where: [{ firebaseUuid: firebase_uuid, isActive: true }],
        });
        if (!user) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'User not found',
            });
        }
        const response = await this.userRepository.update({ firebaseUuid: String(firebase_uuid) }, {
            stepName: user.userStatus === user_type_status_enum_1.UserStatus.Onboarded
                ? user.stepName
                : step_name_enum_1.StepName.HISTORY,
            medicalHistory: userProfileData.medicalHistory,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
                status: true,
                message: 'Failed to update profile',
            });
        }
        const updatedUser = await this.userRepository.findOne({
            firebaseUuid: String(firebase_uuid),
        });
        return {
            status: true,
            message: 'Profile updated successfully',
            stepName: updatedUser.stepName,
            data: {
                medicalHistory: updatedUser.medicalHistory,
            },
        };
    }
    async updateUserProfileCategory(userProfileData, firebase_uuid) {
        const updatedUser = await this.userRepository.findOne({
            where: [{ firebaseUuid: firebase_uuid, isActive: true }],
        });
        if (!updatedUser) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'User not found',
            });
        }
        const userCategorySubCategories = [];
        for (const category of userProfileData.categoryData) {
            if (category.subCategoryIds && category.subCategoryIds.length > 0) {
                for (const subCategoryId of category.subCategoryIds) {
                    const userCategorySubCategory = new user_category_subcategory_entity_1.UserCategorySubCategory();
                    userCategorySubCategory.userId = Number(updatedUser.id);
                    userCategorySubCategory.categoryId = category.categoryId;
                    userCategorySubCategory.subCategoryId = subCategoryId;
                    userCategorySubCategories.push(userCategorySubCategory);
                }
            }
            else {
                const userCategorySubCategory = new user_category_subcategory_entity_1.UserCategorySubCategory();
                userCategorySubCategory.userId = Number(updatedUser.id);
                userCategorySubCategory.categoryId = category.categoryId;
                userCategorySubCategories.push(userCategorySubCategory);
            }
        }
        await this.userCategorySubCategoryRepository.delete({
            userId: parseInt(`${updatedUser.id}`),
        });
        await this.userCategorySubCategoryRepository
            .insert(userCategorySubCategories)
            .catch((err) => {
            if (err.constraint == 'user_category_subcategory_unique_constraint') {
                throw new common_1.BadRequestException(err.message);
            }
        });
        updatedUser.stepName =
            updatedUser.userStatus === user_type_status_enum_1.UserStatus.Onboarded
                ? updatedUser.stepName
                : step_name_enum_1.StepName.CATEGORY;
        await updatedUser.save();
        return {
            status: true,
            message: 'Profile updated successfully',
            stepName: updatedUser.stepName,
            data: userProfileData,
        };
    }
    async updateUserProfileDocument(userProfileData, firebase_uuid) {
        const user = await this.userRepository.findOne({
            where: [{ firebaseUuid: firebase_uuid, isActive: true }],
        });
        if (!user) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'User not found',
            });
        }
        const response = await this.userRepository.update({ firebaseUuid: String(firebase_uuid) }, {
            stepName: user.userStatus === user_type_status_enum_1.UserStatus.Onboarded
                ? user.stepName
                : step_name_enum_1.StepName.CERTIFICATION,
            documentCertificate: userProfileData.documentCertificate,
        });
        const isUpdated = response.hasOwnProperty('affected');
        if (!isUpdated || response.affected === 0) {
            throw new common_1.ForbiddenException({
                status: true,
                message: 'Failed to update profile',
            });
        }
        const updatedUser = await this.userRepository.findOne({
            firebaseUuid: String(firebase_uuid),
        });
        return {
            status: true,
            message: 'Profile updated successfully',
            stepName: updatedUser.stepName,
            data: {
                documentCertificate: updatedUser.documentCertificate,
            },
        };
    }
    async updateUserNameLocation(userProfileData, firebase_uuid) {
        const user = await this.userRepository.findOne({
            where: [{ firebaseUuid: firebase_uuid }],
        });
        if (!user) {
            throw new common_1.NotFoundException({
                status: false,
                message: 'User not found',
            });
        }
        try {
            await this.userRepository.update({ firebaseUuid: String(firebase_uuid) }, {
                fullName: userProfileData.fullName,
                location: userProfileData.location,
            });
            return {
                status: true,
                message: 'Profile updated successfully',
                data: userProfileData,
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e.message);
        }
    }
    async createEarlyUser(user, firebase_uuid, userStatus, source) {
        try {
            const existingEarlyUserEmail = await this.userRepository.findOne({
                where: [{ emailId: user.emailId, firebaseUuid: firebase_uuid }],
            });
            this.emailService.signupEmail('sakshi.rastogi@simubladetechnology.com', user.fullName);
            return {};
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Something went wrong!');
        }
    }
    async checkDuplicateNumber(number) {
        try {
            const user = await firebase_utils_1.admin.auth().getUserByPhoneNumber(number);
            if (user) {
                throw new common_1.ConflictException('Number already exists!');
            }
        }
        catch (err) {
            if (err.code === 'auth/invalid-phone-number') {
                throw new common_1.BadRequestException('Please provide a valid phone number');
            }
            if (err.code === 'auth/user-not-found') {
                return {
                    status: 200,
                    message: 'Number doest not exist.',
                };
            }
            if (err instanceof common_1.ConflictException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(gym_entity_1.Gym)),
    __param(2, (0, typeorm_1.InjectRepository)(user_category_subcategory_entity_1.UserCategorySubCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map