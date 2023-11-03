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
exports.FitnessCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fitness_category_entity_1 = require("./entity/fitness.category.entity");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./entity/user.entity");
const user_category_subcategory_entity_1 = require("./entity/user.category.subcategory.entity");
let FitnessCategoryService = class FitnessCategoryService {
    constructor(userService, fitnessCategoryRepository, userCategorySubCategoryRepository) {
        this.userService = userService;
        this.fitnessCategoryRepository = fitnessCategoryRepository;
        this.userCategorySubCategoryRepository = userCategorySubCategoryRepository;
    }
    async createFitnessCategory(body) {
        const model = {
            name: body.name,
            description: body.description,
            icon: body.icon,
            fitnessCaorderIdtegoryOrderId: body.orderId,
            isActive: body.isActive,
        };
        const fitnessCategoryEntity = this.fitnessCategoryRepository.create(model);
        return await this.fitnessCategoryRepository.save(fitnessCategoryEntity);
    }
    async getFitnessCategoryById(id) {
        const categories = await this.fitnessCategoryRepository.manager
            .query(`select u.id "UserId", fc.id "CategoryId", fc.name "CategoryName", 
      fc.description "CategoryDescription", fc.icon "CategoryIcon", fc.order_id "Order Id", 
      fc.active "Active" 
      from users u
      inner join user_fitness_categories pc on pc.user_id = u.id 
      inner join fitness_category fc on pc.category_id = fc.id 
      where pc.category_id=${id}
      `);
        if (categories) {
            return {
                status: true,
                message: 'Fitness categories list loaded successfully.',
                data: categories,
            };
        }
        throw new common_1.HttpException('Subcategory not found', common_1.HttpStatus.NOT_FOUND);
    }
    async updateFitnessCategoryById(id) {
        const categories = await this.fitnessCategoryRepository.findOne(+id);
        if (categories) {
            return categories[0];
        }
        throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
    }
    async findOne(id) {
        const category = await this.fitnessCategoryRepository.manager
            .query(`select pc.user_id "User Id", pc.category_id "Category Id", pc.subcategory_id "SubCategory Id" 
    from users u
    inner join user_fitness_categories pc on pc.user_id = u.id 
    inner join fitness_category fc on pc.category_id = fc.id 
    where pc.category_id=${id}
    `);
        if (category) {
            return category[0];
        }
        throw new common_1.HttpException('Event not found', common_1.HttpStatus.NOT_FOUND);
    }
    async getAllPreferredFitnessCategories() {
        const categoryFitness = await this.fitnessCategoryRepository.find({
            select: ['id', 'name', 'description', 'icon', 'orderId', 'isActive'],
            where: {
                isActive: true,
            },
            order: {
                orderId: 'ASC',
                name: 'ASC',
            },
        });
        if (categoryFitness) {
            return {
                status: true,
                message: 'Fitness categories list loaded successfully.',
                data: categoryFitness,
            };
        }
        else {
            return {
                status: false,
                message: 'Fitness categories not found',
                data: [],
            };
        }
    }
};
FitnessCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(fitness_category_entity_1.FitnessCategory)),
    __param(2, (0, typeorm_1.InjectRepository)(user_category_subcategory_entity_1.UserCategorySubCategory)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FitnessCategoryService);
exports.FitnessCategoryService = FitnessCategoryService;
//# sourceMappingURL=fitness.category.service.js.map