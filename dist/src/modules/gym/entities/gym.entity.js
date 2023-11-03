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
exports.Gym = void 0;
const base_model_1 = require("../../../utils/base.model");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const business_hour_entity_1 = require("./business_hour.entity");
const amenity_entity_1 = require("./amenity.entity");
const gym_profile_enum_1 = require("../../../enums/gym-profile.enum");
const user_entity_1 = require("../../user/entity/user.entity");
const gym_category_subcategory_entity_1 = require("./gym.category.subcategory.entity");
const instructor_entity_1 = require("../../instructor/entities/instructor.entity");
const gym_type_status_enum_1 = require("../../../enums/gym-type-status.enum");
const class_entity_1 = require("../../class/entities/class.entity");
let Gym = class Gym extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.OneToMany)(() => gym_category_subcategory_entity_1.GymCategorySubCategory, (gcs) => gcs.gym),
    __metadata("design:type", Array)
], Gym.prototype, "gymCategorySubcategories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Owner Email',
        example: 'benfrancis@gmail.com',
    }),
    (0, typeorm_1.Column)({ name: 'owner_email', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Gym.prototype, "ownerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Owner Phone Number',
        example: '+1 670 171 5629',
    }),
    (0, typeorm_1.Column)({ name: 'owner_phone_number', length: 50, nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "ownerPhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Owner Name',
        example: 'Arnold Schwarzenegger',
    }),
    (0, typeorm_1.Column)({ name: 'owner_name', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "ownerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Owner Birthdate',
        example: '2023-04-15',
    }),
    (0, typeorm_1.Column)({ name: 'birth_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Gym.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business Name',
        example: 'Gold Gym',
    }),
    (0, typeorm_1.Column)({ name: 'business_name', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business Email',
        example: 'contact@goldgym.com',
    }),
    (0, typeorm_1.Column)({ name: 'business_email', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Gym.prototype, "businessEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business Address',
        example: '27, Church Street, New York, NY, USA',
    }),
    (0, typeorm_1.Column)({ name: 'business_address', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "businessAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_place_id', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "businessPlaceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business Contact',
        example: '+1 2345 6778',
    }),
    (0, typeorm_1.Column)({ name: 'business_contact', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "businessContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Communication Address',
        example: '27, Church Street, New York, NY, USA',
    }),
    (0, typeorm_1.Column)({ name: 'communication_address', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "communicationAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gym Logo',
        example: 'photo://gymlogo',
    }),
    (0, typeorm_1.Column)({ name: 'photos', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "photos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gym Logo',
        example: 'photo://gymlogo',
    }),
    (0, typeorm_1.Column)({ name: 'cover_photo', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "coverPhoto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category of Gym',
        example: gym_profile_enum_1.GymType['WELLNESS CENTER'],
    }),
    (0, typeorm_1.Column)({ name: 'category', nullable: true }),
    __metadata("design:type", Number)
], Gym.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'description',
        example: 'An American chain of international co-ed fitness centers originally started by Joe Gold in Venice Beach, California',
    }),
    (0, typeorm_1.Column)({ name: 'description', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Step Name',
        example: 'Owner' ||
            'Business' ||
            'Map' ||
            'Communication' ||
            'Financial' ||
            'About' ||
            'Hours' ||
            'Logo' ||
            'Waiver' ||
            'Category' ||
            'Amenities',
    }),
    (0, typeorm_1.Column)({
        name: 'step_name',
        nullable: true,
    }),
    __metadata("design:type", String)
], Gym.prototype, "stepName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => business_hour_entity_1.Business_Hour, (businessHours) => businessHours.gym),
    (0, typeorm_1.JoinColumn)({ name: 'gymId' }),
    __metadata("design:type", Array)
], Gym.prototype, "businessHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Waiver',
        example: 'waiver data',
    }),
    (0, typeorm_1.Column)({ name: 'waiver', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "waiver", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'waiver_name', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "waiverName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'amenities',
        example: ['Personal Trainer', 'Sauna'],
    }),
    (0, typeorm_1.ManyToMany)(() => amenity_entity_1.Amenity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Gym.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.gyms),
    __metadata("design:type", user_entity_1.User)
], Gym.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Financial Details',
        example: '',
    }),
    (0, typeorm_1.Column)({ name: 'financial_details', type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Gym.prototype, "financialDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Google Business Profile',
        example: 'Google-1234',
    }),
    (0, typeorm_1.Column)({ name: 'google_business_profile', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "googleBusinessProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Registration Mode',
        example: gym_profile_enum_1.RegistrationMode.APP,
    }),
    (0, typeorm_1.Column)({ name: 'registrationMode', nullable: true }),
    __metadata("design:type", Number)
], Gym.prototype, "registrationMode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gym Status',
        example: gym_type_status_enum_1.GymStatus.Pending,
    }),
    (0, typeorm_1.Column)({
        name: 'status',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Gym.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => instructor_entity_1.Instructor, (instructor) => instructor.gym),
    __metadata("design:type", Array)
], Gym.prototype, "instructors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => class_entity_1.Class, (classGym) => classGym.gym),
    __metadata("design:type", Array)
], Gym.prototype, "classes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stripe_account_id', nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "stripeAccountId", void 0);
Gym = __decorate([
    (0, typeorm_1.Entity)('gyms')
], Gym);
exports.Gym = Gym;
//# sourceMappingURL=gym.entity.js.map