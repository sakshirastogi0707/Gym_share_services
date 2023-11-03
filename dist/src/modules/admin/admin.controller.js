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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const invite_user_dto_1 = require("./dto/invite-user.dto");
const source_type_enum_1 = require("../../enums/source-type.enum");
const base_response_dto_1 = require("../../utils/base.response.dto");
const user_type_status_enum_1 = require("../../enums/user-type-status.enum");
const resend_email_dto_1 = require("./dto/resend-email.dto");
const email_template_enum_1 = require("../../enums/email-template.enum");
const email_service_1 = require("../../utils/email.service");
let AdminController = class AdminController {
    constructor(adminService, emailService) {
        this.adminService = adminService;
        this.emailService = emailService;
    }
    async invite(req, user) {
        return await this.adminService.inviteUser(user, source_type_enum_1.SourceType.Invited);
    }
    async approve(userId) {
        return await this.adminService.updateUserStatusByAdmin(userId, user_type_status_enum_1.UserStatus.Unverified);
    }
    async decline(userId) {
        return await this.adminService.updateUserStatusByAdmin(userId, user_type_status_enum_1.UserStatus.Declined);
    }
    async getDetailsAdminUserWaitlist() {
        return await this.adminService.getAdminUserWaitlistDetails();
    }
    async validateAdmin(req, res) {
        const authToken = req.headers.authorization;
        res.cookie('authorization', authToken, { maxAge: 3600, httpOnly: true });
        res.cookie('isAuthenticated', true, { maxAge: 3600 });
        res.send({ status: 200, message: 'Admin validated successfully' });
    }
    async resendEmail(payload) {
        try {
            switch (payload.template) {
                case email_template_enum_1.EmailTemplate.INVITE:
                    await this.emailService.sendInviteMail(payload.emailId, payload.name);
            }
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Something went wrong!');
        }
    }
};
__decorate([
    (0, common_1.Post)('/invite'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiCreatedResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, invite_user_dto_1.InviteUserRequestDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "invite", null);
__decorate([
    (0, common_1.Patch)('/:id/approve'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiCreatedResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)('/:id/decline'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiCreatedResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "decline", null);
__decorate([
    (0, common_1.Get)('/users-waitlist'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiOkResponse)({
        type: invite_user_dto_1.GetUserViewResponseSuccessDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDetailsAdminUserWaitlist", null);
__decorate([
    (0, common_1.Get)('/validate'),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "validateAdmin", null);
__decorate([
    (0, common_1.Post)('/resend-email'),
    (0, swagger_1.ApiOkResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_email_dto_1.ResendEmailDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "resendEmail", null);
AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiCreatedResponse)(),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        email_service_1.EmailService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map