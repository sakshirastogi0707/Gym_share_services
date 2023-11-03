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
exports.Booking = void 0;
const class_entity_1 = require("../../class/entities/class.entity");
const session_entity_1 = require("../../class/entities/session.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const base_model_1 = require("../../../utils/base.model");
const typeorm_1 = require("typeorm");
const someoneElse_dto_1 = require("../dto/someoneElse.dto");
const booking_enum_1 = require("../../../enums/booking.enum");
const enum_transformer_utils_1 = require("../../../utils/transformer/enum.transformer.utils");
let Booking = class Booking extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.bookings),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Booking.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => class_entity_1.Class, (fitnessClass) => fitnessClass.bookings),
    (0, typeorm_1.JoinColumn)({ name: 'class_id' }),
    __metadata("design:type", class_entity_1.Class)
], Booking.prototype, "class", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => session_entity_1.Session),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Booking.prototype, "sessions", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'booking_for',
        type: 'integer',
        transformer: new enum_transformer_utils_1.EnumTransformer(booking_enum_1.BookingFor),
        nullable: false,
    }),
    __metadata("design:type", String)
], Booking.prototype, "bookingFor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'booking_time', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Booking.prototype, "bookingTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coupon', nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "coupon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'add_ons', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Booking.prototype, "addOns", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isSomeoneElse', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "isForSomeoneElse", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'someoneElse', type: 'jsonb', nullable: true }),
    __metadata("design:type", someoneElse_dto_1.SomeoneElseModel)
], Booking.prototype, "someoneElse", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        transformer: new enum_transformer_utils_1.EnumTransformer(booking_enum_1.BookingStatus),
        nullable: true,
        default: booking_enum_1.BookingStatus.Request,
    }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Booking.prototype, "isActive", void 0);
Booking = __decorate([
    (0, typeorm_1.Entity)('bookings')
], Booking);
exports.Booking = Booking;
//# sourceMappingURL=booking.entity.js.map