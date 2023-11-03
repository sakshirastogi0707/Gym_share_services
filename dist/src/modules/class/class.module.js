"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModule = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("./class.service");
const class_controller_1 = require("./class.controller");
const class_entity_1 = require("./entities/class.entity");
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const class_category_subcategory_entity_1 = require("./entities/class-category-subcategory.entity");
const session_schedule_entity_1 = require("./entities/session-schedule.entity");
const instructor_entity_1 = require("../instructor/entities/instructor.entity");
const gym_entity_1 = require("../gym/entities/gym.entity");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_middleware_1 = require("../../middlewares/user.middleware");
const session_entity_1 = require("./entities/session.entity");
const user_entity_1 = require("../user/entity/user.entity");
const favourites_entity_1 = require("./entities/favourites.entity");
const guest_user_middleware_1 = require("../../middlewares/guest-user-middleware");
let ClassModule = class ClassModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.UserAuthMiddleware).forRoutes(class_controller_1.ClassController);
        consumer.apply(user_middleware_1.UserMiddleware).forRoutes(class_controller_1.ClassController);
        consumer.apply(guest_user_middleware_1.GuestUserMiddleware).forRoutes({
            path: 'class/:classId/favourites',
            method: common_1.RequestMethod.ALL,
        }, {
            path: 'class/favourites',
            method: common_1.RequestMethod.GET,
        });
    }
};
ClassModule = __decorate([
    (0, common_1.Module)({
        exports: [],
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            typeorm_1.TypeOrmModule.forFeature([
                class_entity_1.Class,
                class_category_subcategory_entity_1.ClassCategorySubcategory,
                session_schedule_entity_1.SessionSchedule,
                instructor_entity_1.Instructor,
                gym_entity_1.Gym,
                session_entity_1.Session,
                favourites_entity_1.Favourites,
                user_entity_1.User,
            ]),
        ],
        controllers: [class_controller_1.ClassController],
        providers: [class_service_1.ClassService, class_entity_1.Class],
    })
], ClassModule);
exports.ClassModule = ClassModule;
//# sourceMappingURL=class.module.js.map