"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entity/user.entity");
const gym_entity_1 = require("../gym/entities/gym.entity");
const admin_auth_middleware_1 = require("../../middlewares/admin-auth.middleware");
const email_service_1 = require("../../utils/email.service");
let AdminModule = class AdminModule {
    configure(consumer) {
        consumer.apply(admin_auth_middleware_1.AdminAuthMiddleware).forRoutes(admin_controller_1.AdminController);
    }
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, gym_entity_1.Gym])],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService, email_service_1.EmailService],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map