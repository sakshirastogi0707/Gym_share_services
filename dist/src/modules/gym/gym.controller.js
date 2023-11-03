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
exports.GymController = void 0;
const common_1 = require("@nestjs/common");
const gym_service_1 = require("./gym.service");
const swagger_1 = require("@nestjs/swagger");
const gym_profile_owner_response_dto_1 = require("./dto/gym-profile-owner-response.dto");
const gym_profile_owner_request_dto_1 = require("./dto/gym-profile-owner-request.dto");
const gym_profile_business_response_dto_1 = require("./dto/gym-profile-business-response.dto");
const gym_profile_business_request_dto_1 = require("./dto/gym-profile-business-request.dto");
const gym_profile_business_address_response_dto_1 = require("./dto/gym-profile-business-address-response.dto");
const gym_profile_business_address_request_dto_1 = require("./dto/gym-profile-business-address-request.dto");
const gym_profile_communication_address_response_dto_1 = require("./dto/gym-profile-communication-address-response.dto");
const gym_profile_communication_address_request_dto_1 = require("./dto/gym-profile-communication-address-request.dto");
const gym_profile_about_business_response_dto_1 = require("./dto/gym-profile-about-business-response.dto");
const gym_profile_about_business_request_dto_1 = require("./dto/gym-profile-about-business-request.dto");
const gym_profile_photos_response_dto_1 = require("./dto/gym-profile-photos-response.dto");
const gym_profile_photos_request_dto_1 = require("./dto/gym-profile-photos-request.dto");
const gym_profile_waiver_response_dto_1 = require("./dto/gym-profile-waiver-response.dto");
const gym_profile_waiver_request_dto_1 = require("./dto/gym-profile-waiver-request.dto");
const gym_profile_category_response_dto_1 = require("./dto/gym-profile-category-response.dto");
const gym_profile_business_opearting_hours_response_dto_1 = require("./dto/gym-profile-business-opearting-hours-response.dto");
const gym_profile_business_opearting_hours_request_dto_1 = require("./dto/gym-profile-business-opearting-hours-request.dto");
const gym_profile_amenity_response_dto_1 = require("./dto/gym-profile-amenity-response.dto");
const gym_profile_amenity_request_dto_1 = require("./dto/gym-profile-amenity-request.dto");
const gym_type_status_enum_1 = require("../../enums/gym-type-status.enum");
const user_type_enum_1 = require("../../enums/user-type.enum");
const base_response_dto_1 = require("../../utils/base.response.dto");
const base_response_dto_2 = require("../../utils/base.response.dto");
const gym_data_dto_1 = require("./dto/gym-data.dto");
const basic_gym_data_dto_1 = require("./dto/basic-gym-data.dto");
const gym_profile_financial_details_response_dto_1 = require("./dto/gym-profile-financial-details-response.dto");
const gym_profile_financial_credit_card_details_request_dto_1 = require("./dto/gym-profile-financial-credit-card-details-request.dto");
const gym_profile_financial_ach_details_request_dto_1 = require("./dto/gym-profile-financial-ach-details-request.dto");
const gym_financial_enum_1 = require("../../enums/gym-financial.enum");
const gym_profile_category_request_dto_1 = require("./dto/gym-profile-category-request.dto");
const stripe_onboarding_dto_1 = require("./dto/stripe-onboarding.dto");
let GymController = class GymController {
    constructor(gymService) {
        this.gymService = gymService;
    }
    async getGymDetailsbyId(req, gymId) {
        const { userType } = req['user'];
        if (userType !== user_type_enum_1.UserType.Gym) {
            throw new common_1.UnauthorizedException('Unauthorised access');
        }
        const res = await this.gymService.getGymById(gymId);
        return {
            status: true,
            message: 'gym fetched successfully.',
            data: res,
        };
    }
    async getGymDetailsbyIdForUser(req, gymId) {
        const { userType } = req['user'];
        if (userType !== user_type_enum_1.UserType.User) {
            throw new common_1.UnauthorizedException('Unauthorised access');
        }
        const res = await this.gymService.getGymByIdForUser(gymId);
        return {
            status: true,
            message: 'gym fetched successfully.',
            data: res,
        };
    }
    async getBasicGymDetailsbyId(req, gymId) {
        const res = await this.gymService.getBasicGymDetailsById(gymId);
        return {
            status: true,
            message: 'gym fetched successfully.',
            data: res,
        };
    }
    async saveGymOnboardingOwnerProfileBasic(gymModelData, req, gymId) {
        const { id } = req['user'];
        return this.gymService.updateGymOwnerProfileBasic(gymId, gymModelData, id);
    }
    async saveGymOnboardingBusinessProfileBasic(gymModelData, req, gymId) {
        const { id } = req['user'];
        return this.gymService.updateGymBusinessProfileBasic(gymId, gymModelData, id);
    }
    async saveGymOnboardingBusinessAddressProfile(gymModelData, req, gymId) {
        const { id } = req['user'];
        return this.gymService.updateGymBusinessAddressProfile(gymId, gymModelData, id);
    }
    async saveGymOnboardingCommunicationAddressProfile(gymModelData, req, gymId) {
        const { id } = req['user'];
        return this.gymService.updateGymCommunicationAddressProfile(gymId, gymModelData, id);
    }
    async saveGymOnboardingAboutAddressProfile(gymModelData, req, gymId) {
        const { id } = req['user'];
        return this.gymService.updateGymAboutAddressProfile(gymId, gymModelData, id);
    }
    async saveGymOnboardingBusinessHoursProfile(gymModelData, req, gymId) {
        return this.gymService.updateGymBusinessHoursProfile(gymId, gymModelData);
    }
    async saveGymOnboardingBusinessPhotosProfile(gymModelData, req, gymId) {
        const { id } = req['user'];
        return this.gymService.updateGymBusinessPhotosProfile(gymId, gymModelData, id);
    }
    async saveGymOnboardingUserWaiverProfile(gymModelData, req, gymId) {
        const { id } = req['user'];
        return this.gymService.updateGymUserWaiverProfile(gymId, gymModelData, id);
    }
    async updateUserOnboardingProfileCategory(req, userModelData, gymId) {
        const { id } = req['user'];
        return this.gymService.updateGymProfileCategory(gymId, userModelData, id);
    }
    async updateGymOnboardingUserAmenityProfile(gymModelData, req, gymId) {
        const { id } = req['user'];
        return this.gymService.updateGymUserAmenityProfile(gymId, gymModelData, id);
    }
    async getGymInstructors(req, gymId) {
        const { id } = req['user'];
        return this.gymService.getGymInstructors(gymId, id);
    }
    async approveGym(gymId) {
        return this.gymService.updateGymStatus(gymId, gym_type_status_enum_1.GymStatus.Approved);
    }
    async declineGym(gymId) {
        return this.gymService.updateGymStatus(gymId, gym_type_status_enum_1.GymStatus.Declined);
    }
    async suspendGym(gymId) {
        return this.gymService.updateGymStatus(gymId, gym_type_status_enum_1.GymStatus.Suspended);
    }
    async updateGymProfile(gymId, payload) {
        if (Object.keys(payload).length === 0) {
            throw new common_1.BadRequestException('Please provide the value to be updated!');
        }
        return await this.gymService.updateGymProfile(gymId, payload);
    }
    async financialCreditCardDetailsGym(req, gymId, financialDetails) {
        return this.gymService.updateFinancialDetails(gymId, financialDetails, gym_financial_enum_1.PaymentMode.CreditCard);
    }
    async financialAchDetailsGym(req, gymId, financialDetails) {
        return this.gymService.updateFinancialDetails(gymId, financialDetails, gym_financial_enum_1.PaymentMode.ACH);
    }
    async getReviews(gymId) {
        return this.gymService.getGymReviews(gymId);
    }
    async getconnecturl(gymId) {
        return await this.gymService.getStripeConnectUrl(gymId);
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: gym_data_dto_1.GymDataModal,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "getGymDetailsbyId", null);
__decorate([
    (0, common_1.Get)('/:id/for-users'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: basic_gym_data_dto_1.UserGymDetailDataResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "getGymDetailsbyIdForUser", null);
__decorate([
    (0, common_1.Get)('/:id/basic'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: basic_gym_data_dto_1.BasicGymDataResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "getBasicGymDetailsbyId", null);
__decorate([
    (0, common_1.Patch)('/:id/owner-profile'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: gym_profile_owner_response_dto_1.GymProfileOwnerSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gym_profile_owner_request_dto_1.GymProfileOwnerRequestDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "saveGymOnboardingOwnerProfileBasic", null);
__decorate([
    (0, common_1.Patch)('/:id/business-profile'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: gym_profile_business_response_dto_1.GymProfileBusinessSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gym_profile_business_request_dto_1.GymProfileBusinessRequestDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "saveGymOnboardingBusinessProfileBasic", null);
__decorate([
    (0, common_1.Patch)('/:id/business-address'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: gym_profile_business_address_response_dto_1.GymProfileBusinessAddressSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gym_profile_business_address_request_dto_1.GymProfileBusinessAddressRequestDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "saveGymOnboardingBusinessAddressProfile", null);
__decorate([
    (0, common_1.Patch)('/:id/communication-address'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: gym_profile_communication_address_response_dto_1.GymProfileCommunicationAddressSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gym_profile_communication_address_request_dto_1.GymProfileCommunicationAddressRequestDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "saveGymOnboardingCommunicationAddressProfile", null);
__decorate([
    (0, common_1.Patch)('/:id/about-business'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: gym_profile_about_business_response_dto_1.GymProfileAboutBusinessSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gym_profile_about_business_request_dto_1.GymProfileAboutBusinessRequestDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "saveGymOnboardingAboutAddressProfile", null);
__decorate([
    (0, common_1.Patch)('/:id/business-hours'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: gym_profile_business_opearting_hours_response_dto_1.GymProfileBusinessOperatingHoursSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gym_profile_business_opearting_hours_request_dto_1.GymProfileBusinessOperatingHoursRequestDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "saveGymOnboardingBusinessHoursProfile", null);
__decorate([
    (0, common_1.Patch)('/:id/business-photo'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: gym_profile_photos_response_dto_1.GymProfilePhotosSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gym_profile_photos_request_dto_1.GymProfilePhotosRequestDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "saveGymOnboardingBusinessPhotosProfile", null);
__decorate([
    (0, common_1.Patch)('/:id/business-waiver'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: gym_profile_waiver_response_dto_1.GymProfileWaiverSuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gym_profile_waiver_request_dto_1.GymProfileWaiverRequestDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "saveGymOnboardingUserWaiverProfile", null);
__decorate([
    (0, common_1.Patch)('/:id/fitness-category'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Gym User Profile Onboarding',
        type: gym_profile_category_response_dto_1.GymProfileCategoryUpdateSuccessDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, gym_profile_category_request_dto_1.GymProfileCategoryRequestDto, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "updateUserOnboardingProfileCategory", null);
__decorate([
    (0, common_1.Patch)('/:id/amenities'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: gym_profile_amenity_response_dto_1.GymProfileAmenitySuccessDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gym_profile_amenity_request_dto_1.GymProfileAmenityRequestDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "updateGymOnboardingUserAmenityProfile", null);
__decorate([
    (0, common_1.Get)('/:id/instructors'),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_2.BaseResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "getGymInstructors", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "approveGym", null);
__decorate([
    (0, common_1.Patch)(':id/decline'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "declineGym", null);
__decorate([
    (0, common_1.Patch)(':id/suspend'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "suspendGym", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_2.BaseResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, gym_data_dto_1.GymUpdateRequestDto]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "updateGymProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id/financial/creditcard'),
    (0, swagger_1.ApiOkResponse)({
        type: gym_profile_financial_details_response_dto_1.GymProfileFinancialSuccessDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, gym_profile_financial_credit_card_details_request_dto_1.GymProfileFinancialCreditCardRequestDto]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "financialCreditCardDetailsGym", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id/financial/ach'),
    (0, swagger_1.ApiOkResponse)({
        type: gym_profile_financial_details_response_dto_1.GymProfileFinancialSuccessDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, gym_profile_financial_ach_details_request_dto_1.GymProfileFinancialAchDetailsRequestDto]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "financialAchDetailsGym", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_2.BaseResponseDto,
    }),
    (0, common_1.Get)(':id/reviews'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Get)('/:id/connect-onboarding-url'),
    (0, swagger_1.ApiOkResponse)({
        type: stripe_onboarding_dto_1.StripeConnectOnboardingResponse,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "getconnecturl", null);
GymController = __decorate([
    (0, swagger_1.ApiTags)('Gyms'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('gyms'),
    (0, swagger_1.ApiNotFoundResponse)({
        type: base_response_dto_1.BaseNotFoundErrorReponse,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        type: base_response_dto_1.BaseInternalServerErrorReponse,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: base_response_dto_1.BaseBadRequestErrorReponse,
    }),
    __metadata("design:paramtypes", [gym_service_1.GymService])
], GymController);
exports.GymController = GymController;
//# sourceMappingURL=gym.controller.js.map