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
exports.GymProfileBusinessRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GymProfileBusinessRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business Name',
        example: 'Warner Bros.',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GymProfileBusinessRequestDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business Email Id',
        example: 'warnerb@gmail.com',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], GymProfileBusinessRequestDto.prototype, "businessEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business Contract',
        example: '+916767565689',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GymProfileBusinessRequestDto.prototype, "businessContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business Category',
        example: 'Fitness Studio' || 'Trainer' || 'Wellness Center',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GymProfileBusinessRequestDto.prototype, "category", void 0);
exports.GymProfileBusinessRequestDto = GymProfileBusinessRequestDto;
//# sourceMappingURL=gym-profile-business-request.dto.js.map