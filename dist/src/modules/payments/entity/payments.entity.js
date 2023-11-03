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
exports.Payment = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const base_model_1 = require("../../../utils/base.model");
const lookup_payment_method_entity_1 = require("./lookup-payment-method.entity");
const user_entity_1 = require("../../user/entity/user.entity");
let Payment = class Payment extends base_model_1.BaseModel {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID',
        example: '2jjaUnp8ZC2WJbNioH8ugD',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Payment.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.paymentMethod),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Payment.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment method id',
        example: '1231216768',
    }),
    (0, typeorm_1.ManyToOne)(() => lookup_payment_method_entity_1.LookupPaymentMethod, (lookuppaymentmethod) => lookuppaymentmethod.payment),
    (0, typeorm_1.JoinColumn)({ name: 'payment_method_id' }),
    __metadata("design:type", lookup_payment_method_entity_1.LookupPaymentMethod)
], Payment.prototype, "paymentMethodId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Card holder name',
        example: 'inderkant khandelwal',
    }),
    (0, typeorm_1.Column)({ length: 100, name: 'card_holder_name' }),
    __metadata("design:type", String)
], Payment.prototype, "cardHolderName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Card number',
        example: '1234 5678 6738 3334',
    }),
    (0, typeorm_1.Column)({ length: 20, name: 'card_number' }),
    __metadata("design:type", String)
], Payment.prototype, "cardNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Default card ',
        example: 'true | false',
    }),
    (0, typeorm_1.Column)({ name: 'default_card', default: false }),
    __metadata("design:type", Boolean)
], Payment.prototype, "defaultCard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Expiry date',
        example: '07 / 28',
    }),
    (0, typeorm_1.Column)({ name: 'expiry_date' }),
    __metadata("design:type", Date)
], Payment.prototype, "expiryDate", void 0);
Payment = __decorate([
    (0, typeorm_1.Entity)('payments')
], Payment);
exports.Payment = Payment;
//# sourceMappingURL=payments.entity.js.map