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
exports.CouponController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const coupon_service_1 = require("./coupon.service");
const create_coupon_dto_1 = require("./dto/create-coupon.dto");
const coupon_dto_1 = require("./dto/coupon.dto");
const update_coupon_dto_1 = require("./dto/update-coupon.dto");
let CouponController = class CouponController {
    constructor(couponService) {
        this.couponService = couponService;
    }
    createCoupon(dto) {
        return this.couponService.createCoupon(dto);
    }
    getCoupons(queryParams) {
        return this.couponService.getCoupons(queryParams);
    }
    getUserCoupons(queryParams) {
        return this.couponService.getCoupons(queryParams);
    }
    getCouponById(id) {
        return this.couponService.getCoupon(id);
    }
    updateCouponById(id, dto) {
        return this.couponService.updateCouponById(id, dto);
    }
    deleteCouponById(id) {
        return this.couponService.deleteCouponById(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coupon_dto_1.CreateCouponDto]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "createCoupon", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coupon_dto_1.CouponListRequestParamsDto]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "getCoupons", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)('/user'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coupon_dto_1.CouponListRequestParamsDto]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "getUserCoupons", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "getCouponById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_coupon_dto_1.UpdateCouponDto]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "updateCouponById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "deleteCouponById", null);
CouponController = __decorate([
    (0, swagger_1.ApiTags)('coupon'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('coupon'),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CouponController);
exports.CouponController = CouponController;
//# sourceMappingURL=coupon.controller.js.map