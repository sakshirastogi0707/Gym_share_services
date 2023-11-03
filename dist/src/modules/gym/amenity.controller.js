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
exports.AmenityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../utils/base.response.dto");
const amenity_service_1 = require("./amenity.service");
const amenities_data_dto_1 = require("./dto/amenities-data.dto");
let AmenityController = class AmenityController {
    constructor(amenityService) {
        this.amenityService = amenityService;
    }
    async findAll() {
        const amenities = await this.amenityService.getAllAmenities();
        return {
            status: true,
            message: 'Amenities List loaded successfully.',
            data: amenities,
        };
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOkResponse)({
        type: amenities_data_dto_1.AmentiesResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AmenityController.prototype, "findAll", null);
AmenityController = __decorate([
    (0, swagger_1.ApiTags)('Amenity'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('amenities'),
    (0, swagger_1.ApiNotFoundResponse)({
        type: base_response_dto_1.BaseNotFoundErrorReponse,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        type: base_response_dto_1.BaseInternalServerErrorReponse,
    }),
    __metadata("design:paramtypes", [amenity_service_1.AmenityService])
], AmenityController);
exports.AmenityController = AmenityController;
//# sourceMappingURL=amenity.controller.js.map