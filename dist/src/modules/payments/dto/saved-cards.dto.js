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
exports.GetSavedCardsSuccessDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../../utils/base.response.dto");
class SavedCardDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Card Id',
        example: 'pm_1NSylbBvww7E86b9J1hvzttx',
    }),
    __metadata("design:type", String)
], SavedCardDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Brand',
        example: 'visa',
    }),
    __metadata("design:type", String)
], SavedCardDTO.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Funding',
        example: 'credit',
    }),
    __metadata("design:type", String)
], SavedCardDTO.prototype, "funding", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last 4 digits',
        example: '4242',
    }),
    __metadata("design:type", String)
], SavedCardDTO.prototype, "last4", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Is default or not',
        example: true,
    }),
    __metadata("design:type", Boolean)
], SavedCardDTO.prototype, "default", void 0);
class GetSavedCardsSuccessDTO extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [SavedCardDTO] }),
    __metadata("design:type", Array)
], GetSavedCardsSuccessDTO.prototype, "data", void 0);
exports.GetSavedCardsSuccessDTO = GetSavedCardsSuccessDTO;
//# sourceMappingURL=saved-cards.dto.js.map