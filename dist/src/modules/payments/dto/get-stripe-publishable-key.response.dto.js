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
exports.GetStripePublishableKeySuccessDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../../utils/base.response.dto");
class GetStripePublishableKeySuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stripe publishable key',
        example: 'pk_test_GdKqRexjEn4Jgvww7E86b0ElOkU5LApttMwRrYo1MgNXUBHEw6ESd007chualrtoTOhMq1QZ0emjuhvGBxAz974E0w3NpDTTpr9',
    }),
    __metadata("design:type", Object)
], GetStripePublishableKeySuccessDto.prototype, "data", void 0);
exports.GetStripePublishableKeySuccessDto = GetStripePublishableKeySuccessDto;
//# sourceMappingURL=get-stripe-publishable-key.response.dto.js.map