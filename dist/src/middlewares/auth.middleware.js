"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const firebase_utils_1 = require("../utils/firebase.utils");
let UserAuthMiddleware = class UserAuthMiddleware {
    async use(req, res, next) {
        var _a, _b;
        try {
            if (!req.headers)
                throw new common_1.BadRequestException();
            if (req.headers) {
                const authorizationKey = req.headers.hasOwnProperty('authorization');
                const authVal = req.headers.authorization;
                let token;
                if (!authorizationKey)
                    throw new common_1.NotFoundException();
                if (!authVal || !authVal.toString().includes('Bearer'))
                    throw new common_1.NotFoundException();
                token = authVal.toString().split(' ')[1];
                const decodedToken = await firebase_utils_1.admin.auth().verifyIdToken(token && token);
                const uuid = decodedToken.uid;
                const emailId = decodedToken.email;
                const phoneNumber = decodedToken.phone_number;
                req['firebase_uuid'] = uuid;
                req['email_id'] = emailId;
                req['phone_number'] = phoneNumber;
                next();
            }
        }
        catch (error) {
            if (error.code === 'auth/argument-error' ||
                error.code === 'auth/id-token-expired' ||
                ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) === common_1.HttpStatus.BAD_REQUEST ||
                ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.statusCode) === common_1.HttpStatus.NOT_FOUND)
                throw new common_1.UnauthorizedException('Unauthorized Access');
            throw new common_1.InternalServerErrorException('Server Error !');
        }
    }
};
UserAuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], UserAuthMiddleware);
exports.UserAuthMiddleware = UserAuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map