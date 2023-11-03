"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymModule = void 0;
const common_1 = require("@nestjs/common");
const gym_service_1 = require("./gym.service");
const gym_controller_1 = require("./gym.controller");
const gym_entity_1 = require("./entities/gym.entity");
const typeorm_1 = require("@nestjs/typeorm");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_middleware_1 = require("../../middlewares/user.middleware");
const user_module_1 = require("../user/user.module");
const user_entity_1 = require("../user/entity/user.entity");
const gym_category_subcategory_entity_1 = require("./entities/gym.category.subcategory.entity");
const business_hour_entity_1 = require("./entities/business_hour.entity");
const instructor_entity_1 = require("../instructor/entities/instructor.entity");
const amenity_entity_1 = require("./entities/amenity.entity");
const gym_middleware_1 = require("../../middlewares/gym.middleware");
const class_entity_1 = require("../class/entities/class.entity");
const trained_for_entity_1 = require("../instructor/entities/trained_for.entity");
const payments_module_1 = require("../payments/payments.module");
let GymModule = class GymModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.UserAuthMiddleware).forRoutes(gym_controller_1.GymController);
        consumer.apply(user_middleware_1.UserMiddleware).forRoutes(gym_controller_1.GymController);
        consumer
            .apply(gym_middleware_1.GymMiddleware)
            .exclude({
            path: 'gym/:id/reviews',
            method: common_1.RequestMethod.GET,
        })
            .forRoutes(gym_controller_1.GymController);
    }
};
GymModule = __decorate([
    (0, common_1.Module)({
        exports: [gym_service_1.GymService],
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => payments_module_1.PaymentsModule),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                gym_entity_1.Gym,
                gym_category_subcategory_entity_1.GymCategorySubCategory,
                business_hour_entity_1.Business_Hour,
                amenity_entity_1.Amenity,
                instructor_entity_1.Instructor,
                class_entity_1.Class,
                trained_for_entity_1.InstructorTrainedFor,
            ]),
        ],
        controllers: [gym_controller_1.GymController],
        providers: [gym_service_1.GymService],
    })
], GymModule);
exports.GymModule = GymModule;
//# sourceMappingURL=gym.module.js.map