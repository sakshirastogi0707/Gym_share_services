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
exports.UserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const user_type_status_enum_1 = require("../enums/user-type-status.enum");
const user_service_1 = require("../modules/user/user.service");
let UserMiddleware = class UserMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        var _a;
        try {
            const user = await this.userService.getUser(req['firebase_uuid'], req['email_id']);
            if (user.userStatus === user_type_status_enum_1.UserStatus.Unverified && req['phone_number']) {
                user.phoneNumber = req['phone_number'];
                user.userStatus = user_type_status_enum_1.UserStatus.Approved;
                user.save();
            }
            req['user'] = user;
            next();
        }
        catch (error) {
            if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) === common_1.HttpStatus.NOT_FOUND) {
                throw new common_1.NotFoundException('User not found !');
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
UserMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_service_1.UserService)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserMiddleware);
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=user.middleware.js.map