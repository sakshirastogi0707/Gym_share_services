"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorModule = void 0;
const common_1 = require("@nestjs/common");
const instructor_service_1 = require("./instructor.service");
const instructor_controller_1 = require("./instructor.controller");
const instructor_entity_1 = require("./entities/instructor.entity");
const trained_for_entity_1 = require("./entities/trained_for.entity");
const certificate_entity_1 = require("./entities/certificate.entity");
const fitness_category_entity_1 = require("../user/entity/fitness.category.entity");
const fitness_subcategory_entity_1 = require("../user/entity/fitness.subcategory.entity");
const typeorm_1 = require("@nestjs/typeorm");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_middleware_1 = require("../../middlewares/user.middleware");
const user_module_1 = require("../user/user.module");
const gym_entity_1 = require("../gym/entities/gym.entity");
let InstructorModule = class InstructorModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.UserAuthMiddleware).forRoutes(instructor_controller_1.InstructorController);
        consumer.apply(user_middleware_1.UserMiddleware).forRoutes(instructor_controller_1.InstructorController);
    }
};
InstructorModule = __decorate([
    (0, common_1.Module)({
        exports: [],
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            typeorm_1.TypeOrmModule.forFeature([
                gym_entity_1.Gym,
                instructor_entity_1.Instructor,
                trained_for_entity_1.InstructorTrainedFor,
                certificate_entity_1.Certificate,
                fitness_category_entity_1.FitnessCategory,
                fitness_subcategory_entity_1.FitnessSubCategory,
            ]),
        ],
        controllers: [instructor_controller_1.InstructorController],
        providers: [instructor_service_1.InstructorService],
    })
], InstructorModule);
exports.InstructorModule = InstructorModule;
//# sourceMappingURL=instructor.module.js.map