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
exports.GymProfileOwnerRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GymProfileOwnerRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Owner Email Id',
        example: 'kunalk@gmail.com',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], GymProfileOwnerRequestDto.prototype, "ownerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Owner Name',
        example: 'Kunal Kumar',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GymProfileOwnerRequestDto.prototype, "ownerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Owner Phone Number',
        example: '+916767565689',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GymProfileOwnerRequestDto.prototype, "ownerPhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Birthdate',
        example: 'yyyy-mm-dd',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], GymProfileOwnerRequestDto.prototype, "birthDate", void 0);
exports.GymProfileOwnerRequestDto = GymProfileOwnerRequestDto;
//# sourceMappingURL=gym-profile-owner-request.dto.js.map