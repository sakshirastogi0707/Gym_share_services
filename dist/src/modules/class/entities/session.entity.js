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
exports.Session = void 0;
const base_model_1 = require("../../../utils/base.model");
const typeorm_1 = require("typeorm");
const class_entity_1 = require("./class.entity");
let Session = class Session extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'on_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Session.prototype, "onDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_time', type: 'time', nullable: true }),
    __metadata("design:type", String)
], Session.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_time', type: 'time', nullable: true }),
    __metadata("design:type", String)
], Session.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_seats', default: 0 }),
    __metadata("design:type", Number)
], Session.prototype, "totalSeats", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'seats_filled', default: 0 }),
    __metadata("design:type", Number)
], Session.prototype, "seatsFilled", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Session.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => class_entity_1.Class, (classObj) => classObj.sessions),
    (0, typeorm_1.JoinColumn)({ name: 'class_id' }),
    __metadata("design:type", class_entity_1.Class)
], Session.prototype, "class", void 0);
Session = __decorate([
    (0, typeorm_1.Entity)('sessions')
], Session);
exports.Session = Session;
//# sourceMappingURL=session.entity.js.map