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
exports.BaseNotFoundErrorReponse = exports.BaseBadRequestErrorReponse = exports.BaseInternalServerErrorReponse = exports.BaseResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'status',
        example: true,
    }),
    __metadata("design:type", Boolean)
], BaseResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'message',
        example: 'success',
    }),
    __metadata("design:type", String)
], BaseResponseDto.prototype, "message", void 0);
exports.BaseResponseDto = BaseResponseDto;
class BaseInternalServerErrorReponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 500,
    }),
    __metadata("design:type", Number)
], BaseInternalServerErrorReponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Internal server error',
    }),
    __metadata("design:type", String)
], BaseInternalServerErrorReponse.prototype, "message", void 0);
exports.BaseInternalServerErrorReponse = BaseInternalServerErrorReponse;
class BaseBadRequestErrorReponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 400,
    }),
    __metadata("design:type", Number)
], BaseBadRequestErrorReponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Bad Request!!',
    }),
    __metadata("design:type", String)
], BaseBadRequestErrorReponse.prototype, "message", void 0);
exports.BaseBadRequestErrorReponse = BaseBadRequestErrorReponse;
class BaseNotFoundErrorReponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 404,
    }),
    __metadata("design:type", Number)
], BaseNotFoundErrorReponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Not Found',
    }),
    __metadata("design:type", String)
], BaseNotFoundErrorReponse.prototype, "message", void 0);
exports.BaseNotFoundErrorReponse = BaseNotFoundErrorReponse;
//# sourceMappingURL=base.response.dto.js.map