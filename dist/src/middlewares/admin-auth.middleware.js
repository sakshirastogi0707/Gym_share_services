"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const firebase_utils_1 = require("../utils/firebase.utils");
const secrets_manager_1 = require("../utils/secrets-manager");
let AdminAuthMiddleware = class AdminAuthMiddleware {
    async use(req, res, next) {
        var _a;
        try {
            const authVal = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            if (!authVal || !authVal.toString().includes('Bearer')) {
                throw new common_1.UnauthorizedException({
                    status: false,
                    message: 'authorization header is missing or invalid',
                });
            }
            const AdminUIDList = await (0, secrets_manager_1.getAdminUIDs)();
            const token = authVal.toString().split(' ')[1];
            const decodedToken = await firebase_utils_1.admin.auth().verifyIdToken(token);
            const uuid = decodedToken.uid;
            if (!AdminUIDList.includes(uuid)) {
                throw new common_1.UnauthorizedException({
                    status: false,
                    message: 'Unauthorized Access',
                });
            }
            next();
        }
        catch (error) {
            throw new common_1.UnauthorizedException({
                status: false,
                message: 'Unauthorized Access',
            });
        }
    }
};
AdminAuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AdminAuthMiddleware);
exports.AdminAuthMiddleware = AdminAuthMiddleware;
//# sourceMappingURL=admin-auth.middleware.js.map