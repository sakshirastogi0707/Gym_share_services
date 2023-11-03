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
exports.StripeCustomer = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const base_model_1 = require("../../../utils/base.model");
const user_entity_1 = require("../../user/entity/user.entity");
let StripeCustomer = class StripeCustomer extends base_model_1.BaseModel {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID',
        example: '2jjaUnp8ZC2WJbNioH8ugD',
    }),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], StripeCustomer.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User'),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], StripeCustomer.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', unique: true }),
    __metadata("design:type", String)
], StripeCustomer.prototype, "customerId", void 0);
StripeCustomer = __decorate([
    (0, typeorm_1.Entity)('stripe_customers')
], StripeCustomer);
exports.StripeCustomer = StripeCustomer;
//# sourceMappingURL=stripe-customer.entity.js.map