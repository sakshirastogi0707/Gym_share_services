"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponModule = void 0;
const common_1 = require("@nestjs/common");
const coupon_entity_1 = require("./entities/coupon.entity");
const typeorm_1 = require("@nestjs/typeorm");
const coupon_controller_1 = require("./coupon.controller");
const coupon_service_1 = require("./coupon.service");
const admin_auth_middleware_1 = require("../../middlewares/admin-auth.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
let CouponModule = class CouponModule {
    configure(consumer) {
        consumer
            .apply(admin_auth_middleware_1.AdminAuthMiddleware)
            .exclude({ path: 'coupon/user/:id', method: common_1.RequestMethod.GET }, { path: 'coupon/user', method: common_1.RequestMethod.GET })
            .forRoutes(coupon_controller_1.CouponController);
        consumer.apply(auth_middleware_1.UserAuthMiddleware).forRoutes({ path: 'coupon/user/:id', method: common_1.RequestMethod.GET }, { path: 'coupon/user', method: common_1.RequestMethod.GET });
    }
};
CouponModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([coupon_entity_1.Coupon])],
        controllers: [coupon_controller_1.CouponController],
        providers: [coupon_service_1.CouponService],
    })
], CouponModule);
exports.CouponModule = CouponModule;
//# sourceMappingURL=coupon.module.js.map