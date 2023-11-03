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
exports.Lead = void 0;
const base_model_1 = require("../../../utils/base.model");
const typeorm_1 = require("typeorm");
let Lead = class Lead extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        nullable: false,
        length: 50,
    }),
    __metadata("design:type", String)
], Lead.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email_id',
        nullable: false,
        length: 100,
        unique: true,
    }),
    __metadata("design:type", String)
], Lead.prototype, "emailId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'phone_number',
        length: 50,
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], Lead.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'address',
        nullable: false,
    }),
    __metadata("design:type", String)
], Lead.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'lead_type',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Lead.prototype, "leadType", void 0);
Lead = __decorate([
    (0, typeorm_1.Entity)('leads')
], Lead);
exports.Lead = Lead;
//# sourceMappingURL=lead.entity.js.map