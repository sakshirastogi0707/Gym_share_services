"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModule = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const booking_controller_1 = require("./booking.controller");
const booking_entity_1 = require("./entities/booking.entity");
const class_entity_1 = require("../class/entities/class.entity");
const session_entity_1 = require("../class/entities/session.entity");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_middleware_1 = require("../../middlewares/user.middleware");
const user_entity_1 = require("../user/entity/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../user/user.module");
let BookingModule = class BookingModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.UserAuthMiddleware).forRoutes(booking_controller_1.BookingController);
        consumer.apply(user_middleware_1.UserMiddleware).forRoutes(booking_controller_1.BookingController);
    }
};
BookingModule = __decorate([
    (0, common_1.Module)({
        exports: [],
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            typeorm_1.TypeOrmModule.forFeature([booking_entity_1.Booking, user_entity_1.User, class_entity_1.Class, session_entity_1.Session]),
        ],
        controllers: [booking_controller_1.BookingController],
        providers: [booking_service_1.BookingService, booking_entity_1.Booking],
    })
], BookingModule);
exports.BookingModule = BookingModule;
//# sourceMappingURL=booking.module.js.map