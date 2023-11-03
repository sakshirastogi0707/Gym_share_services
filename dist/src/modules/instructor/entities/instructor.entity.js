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
exports.Instructor = void 0;
const base_model_1 = require("../../../utils/base.model");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const trained_for_entity_1 = require("./trained_for.entity");
const certificate_entity_1 = require("./certificate.entity");
const gym_entity_1 = require("../../gym/entities/gym.entity");
const class_entity_1 = require("../../class/entities/class.entity");
let Instructor = class Instructor extends base_model_1.BaseModel {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name',
        example: 'Joan Kelly',
    }),
    (0, typeorm_1.Column)({ name: 'name', length: 50 }),
    __metadata("design:type", String)
], Instructor.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Photo',
        example: 'pic://picture',
    }),
    (0, typeorm_1.Column)({ name: 'photo' }),
    __metadata("design:type", String)
], Instructor.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of Birth',
        example: '1994-04-15',
    }),
    (0, typeorm_1.Column)({ name: 'dob', type: 'date' }),
    __metadata("design:type", Date)
], Instructor.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'About',
        example: 'A world-class coach dedicated to your success.',
    }),
    (0, typeorm_1.Column)({ name: 'about', length: 100 }),
    __metadata("design:type", String)
], Instructor.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Experience years',
        example: 5,
    }),
    (0, typeorm_1.Column)({ name: 'exp_years' }),
    __metadata("design:type", Number)
], Instructor.prototype, "expYears", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Experience months',
        example: 10,
    }),
    (0, typeorm_1.Column)({ name: 'exp_months' }),
    __metadata("design:type", Number)
], Instructor.prototype, "expMonths", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gym_entity_1.Gym, (gym) => gym.instructors),
    __metadata("design:type", gym_entity_1.Gym)
], Instructor.prototype, "gym", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trained_for_entity_1.InstructorTrainedFor, (itf) => itf.instructor),
    __metadata("design:type", Array)
], Instructor.prototype, "trainedFor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => certificate_entity_1.Certificate, (certificate) => certificate.instructor),
    (0, typeorm_1.JoinColumn)({ name: 'instructor' }),
    __metadata("design:type", Array)
], Instructor.prototype, "certificates", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => class_entity_1.Class, (cls) => cls.instructor),
    __metadata("design:type", Array)
], Instructor.prototype, "classes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of all active instructors',
        example: 'True or False',
    }),
    (0, typeorm_1.Column)({ name: 'active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Instructor.prototype, "active", void 0);
Instructor = __decorate([
    (0, typeorm_1.Entity)('instructors')
], Instructor);
exports.Instructor = Instructor;
//# sourceMappingURL=instructor.entity.js.map