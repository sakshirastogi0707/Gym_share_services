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
exports.GymProfileAboutBusinessSuccessDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../../utils/base.response.dto");
const gym_profile_about_business_request_dto_1 = require("./gym-profile-about-business-request.dto");
class GymProfileAboutBusinessSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GymProfileAboutBusinessSuccessDto.prototype, "stepName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", gym_profile_about_business_request_dto_1.GymProfileAboutBusinessRequestDto)
], GymProfileAboutBusinessSuccessDto.prototype, "data", void 0);
exports.GymProfileAboutBusinessSuccessDto = GymProfileAboutBusinessSuccessDto;
//# sourceMappingURL=gym-profile-about-business-response.dto.js.map