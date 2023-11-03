"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const user_type_enum_1 = require("../enums/user-type.enum");
let GuestUserMiddleware = class GuestUserMiddleware {
    async use(req, res, next) {
        try {
            if (req['user'].userType !== user_type_enum_1.UserType.User) {
                throw new common_1.UnauthorizedException('Unauthorised user!');
            }
            next();
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(error.message);
            }
            throw new common_1.InternalServerErrorException('Server Error !');
        }
    }
};
GuestUserMiddleware = __decorate([
    (0, common_1.Injectable)()
], GuestUserMiddleware);
exports.GuestUserMiddleware = GuestUserMiddleware;
//# sourceMappingURL=guest-user-middleware.js.map