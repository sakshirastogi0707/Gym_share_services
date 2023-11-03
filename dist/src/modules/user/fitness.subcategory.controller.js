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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FitnessSubCategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../utils/base.response.dto");
const fitness_subcategory_service_1 = require("./fitness.subcategory.service");
const fitness_subcategory_dto_1 = require("./dto/fitness-subcategory.dto");
let FitnessSubCategoryController = class FitnessSubCategoryController {
    constructor(fitnessSubCategoryService) {
        this.fitnessSubCategoryService = fitnessSubCategoryService;
    }
    async create(body) {
        return await this.fitnessSubCategoryService.createFitnessSubCategory(body);
    }
    async findAll() {
        return await this.fitnessSubCategoryService.getAllSubCategory();
    }
    async findOne(id) {
        return await this.fitnessSubCategoryService.getAllFitnessSubCategoryById(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: base_response_dto_1.BaseResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fitness_subcategory_dto_1.FitnessSubCategoryDto]),
    __metadata("design:returntype", Promise)
], FitnessSubCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/fitness-subcategories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FitnessSubCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FitnessSubCategoryController.prototype, "findOne", null);
FitnessSubCategoryController = __decorate([
    (0, swagger_1.ApiTags)('FitnessCategory'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('fitnessSubCategory'),
    __metadata("design:paramtypes", [fitness_subcategory_service_1.FitnessSubCategoryService])
], FitnessSubCategoryController);
exports.FitnessSubCategoryController = FitnessSubCategoryController;
//# sourceMappingURL=fitness.subcategory.controller.js.map