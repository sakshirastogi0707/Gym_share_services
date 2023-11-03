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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const base_model_1 = require("../../../utils/base.model");
const user_category_subcategory_entity_1 = require("./user.category.subcategory.entity");
const gym_entity_1 = require("../../gym/entities/gym.entity");
const enum_transformer_utils_1 = require("../../../utils/transformer/enum.transformer.utils");
const source_type_enum_1 = require("../../../enums/source-type.enum");
const favourites_entity_1 = require("../../class/entities/favourites.entity");
const payments_entity_1 = require("../../payments/entity/payments.entity");
const booking_entity_1 = require("../../booking/entities/booking.entity");
let User = class User extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.OneToMany)(() => user_category_subcategory_entity_1.UserCategorySubCategory, (ucs) => ucs.user),
    __metadata("design:type", Array)
], User.prototype, "userCategorySubcategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => gym_entity_1.Gym, (gym) => gym.user),
    __metadata("design:type", Array)
], User.prototype, "gyms", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], User.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'full_name',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email_id',
        nullable: true,
        length: 100,
    }),
    __metadata("design:type", String)
], User.prototype, "emailId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'phone_number',
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'location',
        type: 'simple-json',
        nullable: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'profile_pic',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "profilePic", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'birth_date',
        type: 'date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'firebase_uuid',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "firebaseUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'document_certificate',
        nullable: true,
        type: 'jsonb',
    }),
    __metadata("design:type", Array)
], User.prototype, "documentCertificate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'experience_level',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "experienceLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'step_name',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "stepName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_type',
        nullable: false,
    }),
    __metadata("design:type", Number)
], User.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', {
        name: 'medical_history',
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "medicalHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_active',
        nullable: true,
        default: true,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_status',
        nullable: false,
    }),
    __metadata("design:type", Number)
], User.prototype, "userStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        transformer: new enum_transformer_utils_1.EnumTransformer(source_type_enum_1.SourceType),
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'address',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favourites_entity_1.Favourites, (fv) => fv.user),
    __metadata("design:type", Array)
], User.prototype, "favourites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payments_entity_1.Payment, (fv) => fv.user),
    __metadata("design:type", Array)
], User.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.user),
    __metadata("design:type", Array)
], User.prototype, "bookings", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map