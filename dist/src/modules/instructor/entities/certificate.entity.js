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
exports.Certificate = void 0;
const base_model_1 = require("../../../utils/base.model");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const instructor_entity_1 = require("./instructor.entity");
let Certificate = class Certificate extends base_model_1.BaseModel {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Display Order ID',
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: 'order_id' }),
    __metadata("design:type", Number)
], Certificate.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name',
        example: 'Advance Yoga Certificate',
    }),
    (0, typeorm_1.Column)({ name: 'name', length: 50 }),
    __metadata("design:type", String)
], Certificate.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'PDF File',
        example: 'certificate.pdf',
    }),
    (0, typeorm_1.Column)({ name: 'pdf_file' }),
    __metadata("design:type", String)
], Certificate.prototype, "pdfFile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of all active certificates',
        example: 'True or False',
    }),
    (0, typeorm_1.Column)({ name: 'active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Certificate.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => instructor_entity_1.Instructor, (instructor) => instructor.certificates),
    __metadata("design:type", instructor_entity_1.Instructor)
], Certificate.prototype, "instructor", void 0);
Certificate = __decorate([
    (0, typeorm_1.Entity)('certificates')
], Certificate);
exports.Certificate = Certificate;
//# sourceMappingURL=certificate.entity.js.map