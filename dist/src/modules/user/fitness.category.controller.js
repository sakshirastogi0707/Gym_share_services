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
exports.FitnessCategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fitness_category_service_1 = require("./fitness.category.service");
const fitness_category_dto_1 = require("./dto/fitness-category.dto");
const fitness_category_entity_1 = require("./entity/fitness.category.entity");
let FitnessCategoryController = class FitnessCategoryController {
    constructor(fitnessCategoryService) {
        this.fitnessCategoryService = fitnessCategoryService;
    }
    async create(body) {
        const result = await this.fitnessCategoryService.createFitnessCategory(body);
        return {
            status: true,
            message: 'Fitness category created successfully.',
            data: result,
        };
    }
    async getAll() {
        return await this.fitnessCategoryService.getAllPreferredFitnessCategories();
    }
    async findOne(id) {
        return await this.fitnessCategoryService.getFitnessCategoryById(+id);
    }
};
__decorate([
    (0, common_1.Post)('/create-category'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiCreatedResponse)({
        type: fitness_category_entity_1.FitnessCategory,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fitness_category_dto_1.FitnessCategoryDto]),
    __metadata("design:returntype", Promise)
], FitnessCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/fitness-category'),
    (0, swagger_1.ApiOkResponse)({
        type: fitness_category_entity_1.FitnessCategory,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FitnessCategoryController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({
        type: fitness_category_entity_1.FitnessCategory,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FitnessCategoryController.prototype, "findOne", null);
FitnessCategoryController = __decorate([
    (0, swagger_1.ApiTags)('FitnessCategory'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.Controller)('fitness'),
    __metadata("design:paramtypes", [fitness_category_service_1.FitnessCategoryService])
], FitnessCategoryController);
exports.FitnessCategoryController = FitnessCategoryController;
//# sourceMappingURL=fitness.category.controller.js.map