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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupPaymentMethod = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const base_utils_1 = require("../../../utils/base.utils");
const payments_entity_1 = require("./payments.entity");
let LookupPaymentMethod = class LookupPaymentMethod extends typeorm_1.BaseEntity {
    async createDetails() {
        this.createdDate = base_utils_1.BaseUtils.formatTimeUTC();
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], LookupPaymentMethod.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID',
        example: '2jjaUnp8ZC2WJbNioH8ugD',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LookupPaymentMethod.prototype, "uuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Card Name',
        example: 'Master Credit Card',
    }),
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], LookupPaymentMethod.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of Card',
        example: 'true | false',
    }),
    (0, typeorm_1.Column)({ name: 'active' }),
    __metadata("design:type", Boolean)
], LookupPaymentMethod.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payments_entity_1.Payment, (payment) => payment.paymentMethodId),
    __metadata("design:type", payments_entity_1.Payment)
], LookupPaymentMethod.prototype, "payment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-01-20 21:43:09',
    }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: true }),
    __metadata("design:type", String)
], LookupPaymentMethod.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LookupPaymentMethod.prototype, "createDetails", null);
LookupPaymentMethod = __decorate([
    (0, typeorm_1.Entity)('lookup_payment_method')
], LookupPaymentMethod);
exports.LookupPaymentMethod = LookupPaymentMethod;
//# sourceMappingURL=lookup-payment-method.entity.js.map