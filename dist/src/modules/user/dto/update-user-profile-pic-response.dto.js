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
exports.UserProfilePicUpdateSuccessDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../../utils/base.response.dto");
const update_user_profile_pic_request_dto_1 = require("./update-user-profile-pic-request.dto");
class UserProfilePicUpdateSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserProfilePicUpdateSuccessDto.prototype, "stepName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", update_user_profile_pic_request_dto_1.UpdateUserProfilePicRequestDto)
], UserProfilePicUpdateSuccessDto.prototype, "data", void 0);
exports.UserProfilePicUpdateSuccessDto = UserProfilePicUpdateSuccessDto;
//# sourceMappingURL=update-user-profile-pic-response.dto.js.map