"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_middleware_1 = require("../../middlewares/user.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const fitness_category_controller_1 = require("./fitness.category.controller");
const fitness_subcategory_controller_1 = require("./fitness.subcategory.controller");
const fitness_category_service_1 = require("./fitness.category.service");
const fitness_subcategory_service_1 = require("./fitness.subcategory.service");
const fitness_category_entity_1 = require("./entity/fitness.category.entity");
const fitness_subcategory_entity_1 = require("./entity/fitness.subcategory.entity");
const user_category_subcategory_entity_1 = require("./entity/user.category.subcategory.entity");
const gym_module_1 = require("../gym/gym.module");
const gym_entity_1 = require("../gym/entities/gym.entity");
const shared_module_1 = require("../shared/shared.module");
const email_service_1 = require("../../utils/email.service");
const instructor_entity_1 = require("../instructor/entities/instructor.entity");
let UserModule = class UserModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.UserAuthMiddleware)
            .exclude({
            path: 'users/check-duplicate-mobile',
            method: common_1.RequestMethod.POST,
        })
            .forRoutes(user_controller_1.UserController);
        consumer
            .apply(user_middleware_1.UserMiddleware)
            .exclude({ path: 'users/signup', method: common_1.RequestMethod.POST }, { path: 'users/early-signup', method: common_1.RequestMethod.POST }, { path: 'users/check-duplicate-mobile', method: common_1.RequestMethod.POST })
            .forRoutes(user_controller_1.UserController);
    }
};
UserModule = __decorate([
    (0, common_1.Module)({
        exports: [user_service_1.UserService],
        imports: [
            (0, common_1.forwardRef)(() => gym_module_1.GymModule),
            shared_module_1.SharedModule,
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                gym_entity_1.Gym,
                fitness_category_entity_1.FitnessCategory,
                fitness_subcategory_entity_1.FitnessSubCategory,
                user_category_subcategory_entity_1.UserCategorySubCategory,
                instructor_entity_1.Instructor,
            ]),
        ],
        controllers: [
            user_controller_1.UserController,
            fitness_category_controller_1.FitnessCategoryController,
            fitness_subcategory_controller_1.FitnessSubCategoryController,
        ],
        providers: [
            user_service_1.UserService,
            fitness_category_service_1.FitnessCategoryService,
            fitness_subcategory_service_1.FitnessSubCategoryService,
            email_service_1.EmailService,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map