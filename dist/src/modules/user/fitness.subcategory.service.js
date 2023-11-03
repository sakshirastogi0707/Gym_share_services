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
exports.FitnessSubCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_service_1 = require("./user.service");
const fitness_category_entity_1 = require("./entity/fitness.category.entity");
const user_entity_1 = require("./entity/user.entity");
const fitness_subcategory_entity_1 = require("./entity/fitness.subcategory.entity");
const user_category_subcategory_entity_1 = require("./entity/user.category.subcategory.entity");
let FitnessSubCategoryService = class FitnessSubCategoryService {
    constructor(userService, fitnessCategoryRepository, fitnessSubCategoryRepository, userCategorySubCategoryRepository) {
        this.userService = userService;
        this.fitnessCategoryRepository = fitnessCategoryRepository;
        this.fitnessSubCategoryRepository = fitnessSubCategoryRepository;
        this.userCategorySubCategoryRepository = userCategorySubCategoryRepository;
    }
    async createFitnessSubCategory(body) {
        const model = {
            fitnessSubCategoryName: body.name,
            fitnessSubCategoryDescription: body.description,
            fitnessSubCategoryOrderId: body.orderId,
            isActive: body.isActive,
        };
        const fitnessSubCategoryEntity = this.fitnessCategoryRepository.create(model);
        await this.fitnessCategoryRepository.save(fitnessSubCategoryEntity);
        return {
            status: true,
            message: 'Fitness SubCategory created successfully',
            data: fitnessSubCategoryEntity,
        };
    }
    async getAllSubCategory() {
        const subAllCategory = await this.fitnessSubCategoryRepository.find({
            where: {
                isActive: true,
            },
            order: {
                orderId: 'ASC',
                name: 'ASC',
            },
        });
        if (subAllCategory !== null) {
            return {
                status: true,
                message: 'Fitness Subcategories List loaded successfully.',
                data: subAllCategory,
            };
        }
        throw new common_1.NotFoundException({
            status: false,
            message: 'Fitness subcategory not found',
        });
    }
    async getAllFitnessSubCategoryById(id) {
        const subCategoryFitness = await this.fitnessSubCategoryRepository.find({
            where: {
                category: id,
                isActive: true,
            },
            order: {
                orderId: 'ASC',
                name: 'ASC',
            },
        });
        if (subCategoryFitness) {
            return {
                status: true,
                message: 'Fitness subcategories list loaded successfully.',
                data: subCategoryFitness,
            };
        }
        else {
            return {
                status: false,
                message: 'Fitness subcategories not found',
                data: [],
            };
        }
    }
    async updateAllFitnessSubCategoryById(id) {
        const updatedCategories = await this.userCategorySubCategoryRepository
            .manager.query(`
      select pc.user_id "Intermediate User Id", pc.category_id "Intermediate Category Id", pc.subcategory_id "Intermediate SubCategory Id" 
      from users u 
      inner join user_fitness_categories pc on pc.user_id = u.id 
      inner join fitness_subcategory fsc on pc.subcategory_id = fsc.id
      where fsc.id = ${id}`);
        if (updatedCategories) {
            return {
                status: true,
                message: 'Subcategories updated successfully.',
                data: updatedCategories,
            };
        }
        throw new common_1.HttpException('Updated Subcategory not found', common_1.HttpStatus.NOT_FOUND);
    }
};
FitnessSubCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(fitness_category_entity_1.FitnessCategory)),
    __param(2, (0, typeorm_1.InjectRepository)(fitness_subcategory_entity_1.FitnessSubCategory)),
    __param(3, (0, typeorm_1.InjectRepository)(user_category_subcategory_entity_1.UserCategorySubCategory)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FitnessSubCategoryService);
exports.FitnessSubCategoryService = FitnessSubCategoryService;
//# sourceMappingURL=fitness.subcategory.service.js.map