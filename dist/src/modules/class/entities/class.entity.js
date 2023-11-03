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
exports.Class = void 0;
const base_model_1 = require("../../../utils/base.model");
const typeorm_1 = require("typeorm");
const gym_entity_1 = require("../../gym/entities/gym.entity");
const instructor_entity_1 = require("../../instructor/entities/instructor.entity");
const session_schedule_entity_1 = require("./session-schedule.entity");
const class_category_subcategory_entity_1 = require("./class-category-subcategory.entity");
const class_enum_1 = require("../../../enums/class.enum");
const enum_transformer_utils_1 = require("../../../utils/transformer/enum.transformer.utils");
const pricing_dto_1 = require("../dto/pricing.dto");
const class_dto_1 = require("../dto/class.dto");
const session_entity_1 = require("./session.entity");
const booking_entity_1 = require("../../booking/entities/booking.entity");
let Class = class Class extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'name', length: 50 }),
    __metadata("design:type", String)
], Class.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'spots', nullable: true }),
    __metadata("design:type", Number)
], Class.prototype, "spots", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", class_dto_1.AboutClass)
], Class.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'add_ons', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Class.prototype, "addOns", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pricing', type: 'jsonb', nullable: true }),
    __metadata("design:type", pricing_dto_1.PricingData)
], Class.prototype, "pricing", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration', nullable: true }),
    __metadata("design:type", Number)
], Class.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        transformer: new enum_transformer_utils_1.EnumTransformer(class_enum_1.Difficulty),
        nullable: true,
    }),
    __metadata("design:type", String)
], Class.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'equipments_required', length: 100, nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "equipmentsRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'photo_thumbnail', nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "photoThumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'photo_cover', nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "photoCover", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        transformer: new enum_transformer_utils_1.EnumTransformer(class_enum_1.ClassStatus),
        nullable: true,
    }),
    __metadata("design:type", String)
], Class.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gym_entity_1.Gym, (gym) => gym.classes),
    __metadata("design:type", gym_entity_1.Gym)
], Class.prototype, "gym", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => instructor_entity_1.Instructor, (ins) => ins.classes),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Class.prototype, "instructor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => class_category_subcategory_entity_1.ClassCategorySubcategory, (ccs) => ccs.class),
    __metadata("design:type", Array)
], Class.prototype, "classCategorySubcategories", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => session_schedule_entity_1.SessionSchedule, (ss) => ss.class),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", session_schedule_entity_1.SessionSchedule)
], Class.prototype, "sessionSchedule", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_entity_1.Session, (session) => session.class),
    __metadata("design:type", Array)
], Class.prototype, "sessions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.class),
    __metadata("design:type", Array)
], Class.prototype, "bookings", void 0);
Class = __decorate([
    (0, typeorm_1.Entity)('classes')
], Class);
exports.Class = Class;
//# sourceMappingURL=class.entity.js.map