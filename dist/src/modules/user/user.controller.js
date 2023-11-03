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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user.dto");
const swagger_1 = require("@nestjs/swagger");
const update_user_profile_basic_response_dto_1 = require("./dto/update-user-profile-basic-response.dto");
const update_user_profile_basic_request_dto_1 = require("./dto/update-user-profile-basic-request.dto");
const update_user_profile_pic_response_dto_1 = require("./dto/update-user-profile-pic-response.dto");
const update_user_profile_pic_request_dto_1 = require("./dto/update-user-profile-pic-request.dto");
const update_user_profile_fitness_level_response_dto_1 = require("./dto/update-user-profile-fitness-level-response.dto");
const update_user_profile_fitness_level_request_dto_1 = require("./dto/update-user-profile-fitness-level-request.dto");
const update_user_profile_medical_history_request_dto_1 = require("./dto/update-user-profile-medical-history-request.dto");
const update_user_profile_medical_history_response_dto_1 = require("./dto/update-user-profile-medical-history-response.dto");
const update_user_profile_document_response_dto_1 = require("./dto/update-user-profile-document-response.dto");
const update_user_profile_document_request_dto_1 = require("./dto/update-user-profile-document-request.dto");
const update_user_profile_category_response_dto_1 = require("./dto/update-user-profile-category-response.dto");
const gym_service_1 = require("../gym/gym.service");
const user_type_enum_1 = require("../../enums/user-type.enum");
const base_response_dto_1 = require("../../utils/base.response.dto");
const account_settings_dto_1 = require("../shared/dtos/account-settings.dto");
const account_settings_service_1 = require("../shared/account-settings.service");
const base_response_dto_2 = require("../../utils/base.response.dto");
const gym_data_dto_1 = require("../gym/dto/gym-data.dto");
const user_type_status_enum_1 = require("../../enums/user-type-status.enum");
const source_type_enum_1 = require("../../enums/source-type.enum");
let UserController = class UserController {
    constructor(userService, gymService, accountService) {
        this.userService = userService;
        this.gymService = gymService;
        this.accountService = accountService;
    }
    async signUp(user, req) {
        const firebase_uuid = req['firebase_uuid'];
        user['firebaseUuid'] = firebase_uuid;
        const email_id = req['email_id'];
        user.emailId = email_id;
        const phone_number = req['phone_number'];
        user['phoneNumber'] = phone_number ? phone_number : user['phoneNumber'];
        if (user.emailId && user['phoneNumber'] && user['firebaseUuid']) {
            const createdUser = await this.userService.createUser(user, firebase_uuid);
            return {
                success: true,
                message: 'User created successfully',
                data: createdUser,
            };
        }
        else {
            throw new common_1.BadRequestException({
                status: false,
                message: 'Invalid user input!',
            });
        }
    }
    async signUpEarlyUser(user, req) {
        try {
            const email_id = req['email_id'];
            if (email_id && user['phoneNumber'] && req['firebase_uuid']) {
                await this.userService.createEarlyUser(user, req['firebase_uuid'], user_type_status_enum_1.UserStatus.Pending, source_type_enum_1.SourceType.Self);
                return {
                    success: true,
                    message: 'User registration successfully',
                };
            }
            else {
                throw new common_1.BadRequestException({
                    status: false,
                    message: 'Invalid user input!',
                });
            }
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async userProfile(req) {
        try {
            const user = req['user'];
            const userType = user['userType'];
            switch (userType) {
                case user_type_enum_1.UserType.User:
                    return this.userService.getUserProfile(user);
                case user_type_enum_1.UserType.Gym:
                    return this.gymService.getGymProfile(user);
                case user_type_enum_1.UserType.Trainer:
                default:
                    throw new common_1.BadRequestException('Invalid user type');
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return {
                    status: false,
                    message: 'User or gym not found',
                    data: null,
                };
            }
            else if (error instanceof common_1.BadRequestException) {
                return {
                    status: false,
                    message: error.message,
                    data: null,
                };
            }
            else {
                throw error;
            }
        }
    }
    async deleteUser(req) {
        const user = req['user'];
        try {
            const result = await this.userService.deleteUser(user);
            return result;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException('User is already deleted');
            }
            throw new common_1.InternalServerErrorException('Something went wrong!');
        }
    }
    async updateUserOnboardingProfileBasic(userModelData, req) {
        const firebase_uuid = req['firebase_uuid'];
        return this.userService.updateUserProfileBasic(userModelData, String(firebase_uuid));
    }
    async updateUserOnboardingProfilePic(userModelData, req) {
        const firebase_uuid = req['firebase_uuid'];
        return this.userService.updateUserProfilePic(userModelData, String(firebase_uuid));
    }
    async updateUserOnboardingProfileFitnessLevel(userModelData, req) {
        const firebase_uuid = req['firebase_uuid'];
        return this.userService.updateUserProfileFitnessLevel(userModelData, String(firebase_uuid));
    }
    async updateUserOnboardingProfileMedicalHistory(userModelData, req) {
        const firebase_uuid = req['firebase_uuid'];
        return this.userService.updateUserProfileMedicalHistory(userModelData, String(firebase_uuid));
    }
    async updateUserOnboardingProfileCategory(userModelData, req) {
        const firebase_uuid = req['firebase_uuid'];
        return this.userService.updateUserProfileCategory(userModelData, String(firebase_uuid));
    }
    async updateUserOnboardingProfileDocument(userModelData, req) {
        const firebase_uuid = req['firebase_uuid'];
        return this.userService.updateUserProfileDocument(userModelData, String(firebase_uuid));
    }
    async updateUserNameLocation(payload, req) {
        const firebase_uuid = req['firebase_uuid'];
        return this.userService.updateUserNameLocation(payload, String(firebase_uuid));
    }
    async updateAccountSettings(payload, req) {
        await this.accountService.updateAccountSettings(req['user']['id'], payload);
        return {
            status: 200,
            message: 'Settings updated successfully',
        };
    }
    async getAccountSettings(req) {
        const data = await this.accountService.getAccountSettings(req['user']);
        return {
            status: 200,
            message: 'Settings fetched successfully',
            data,
        };
    }
    async checkDuplicateNumber(body) {
        return await this.userService.checkDuplicateNumber(body['number']);
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiCreatedResponse)({
        type: user_dto_1.UpdateUserSignupSuccessDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: user_dto_1.UpdateUserSignupSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserSignupRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/early-signup'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiCreatedResponse)({
        type: base_response_dto_2.BaseResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateEarlyUserSignupRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUpEarlyUser", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Response for user details',
        type: user_dto_1.UserDataModal,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Response for gym details',
        type: gym_data_dto_1.GymDataModal,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userProfile", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User deleted successfully',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Patch)('/profile-basic'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: update_user_profile_basic_response_dto_1.UserProfileBasicUpdateSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_profile_basic_request_dto_1.UpdateUserProfileBasicRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserOnboardingProfileBasic", null);
__decorate([
    (0, common_1.Patch)('/profile-pic'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: update_user_profile_pic_response_dto_1.UserProfilePicUpdateSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_profile_pic_request_dto_1.UpdateUserProfilePicRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserOnboardingProfilePic", null);
__decorate([
    (0, common_1.Patch)('/profile-fitness-level'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: update_user_profile_fitness_level_response_dto_1.UserProfileFitnessLevelUpdateSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_profile_fitness_level_request_dto_1.UpdateUserProfileFitnessLevelRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserOnboardingProfileFitnessLevel", null);
__decorate([
    (0, common_1.Patch)('/profile-medical-history'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: update_user_profile_medical_history_response_dto_1.UserProfileMedicalHistoryUpdateSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_profile_medical_history_request_dto_1.UpdateUserProfileMedicalHistoryRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserOnboardingProfileMedicalHistory", null);
__decorate([
    (0, common_1.Patch)('/profile-category'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User Profile Onboarding',
        type: update_user_profile_category_response_dto_1.UserProfileCategoryUpdateSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserProfileCategoryRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserOnboardingProfileCategory", null);
__decorate([
    (0, common_1.Patch)('/profile-document'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: update_user_profile_document_response_dto_1.UserProfileDocumentUpdateSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_profile_document_request_dto_1.UpdateUserProfileDocumentRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserOnboardingProfileDocument", null);
__decorate([
    (0, common_1.Patch)('/edit/basic-details'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: user_dto_1.UserNameLocationUpdateSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserNameLocationRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserNameLocation", null);
__decorate([
    (0, common_1.Patch)('/account-settings'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_2.BaseResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_settings_dto_1.AccountSettings, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateAccountSettings", null);
__decorate([
    (0, common_1.Get)('/account-settings'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiOkResponse)({
        type: account_settings_dto_1.GetAccountSettings,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAccountSettings", null);
__decorate([
    (0, common_1.Post)('/check-duplicate-mobile'),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_2.BaseResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.MobileNumberDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkDuplicateNumber", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiNotFoundResponse)({
        type: base_response_dto_1.BaseNotFoundErrorReponse,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        type: base_response_dto_1.BaseInternalServerErrorReponse,
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        gym_service_1.GymService,
        account_settings_service_1.AccountSettingsService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map