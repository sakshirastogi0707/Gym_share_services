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
exports.SessionSchedule = void 0;
const base_model_1 = require("../../../utils/base.model");
const typeorm_1 = require("typeorm");
const class_entity_1 = require("./class.entity");
const custom_repeat_tranformer_1 = require("../../../utils/transformer/custom-repeat.tranformer");
const class_enum_1 = require("../../../enums/class.enum");
const enum_transformer_utils_1 = require("../../../utils/transformer/enum.transformer.utils");
let SessionSchedule = class SessionSchedule extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], SessionSchedule.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], SessionSchedule.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_time', type: 'time', nullable: true }),
    __metadata("design:type", String)
], SessionSchedule.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_time', type: 'time', nullable: true }),
    __metadata("design:type", String)
], SessionSchedule.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SessionSchedule.prototype, "occurences", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        transformer: new enum_transformer_utils_1.EnumTransformer(class_enum_1.ClassRepeat),
        nullable: true,
    }),
    __metadata("design:type", String)
], SessionSchedule.prototype, "repeat", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'custom_details',
        type: 'jsonb',
        transformer: new custom_repeat_tranformer_1.CustomRepeatTransformer(),
    }),
    __metadata("design:type", Object)
], SessionSchedule.prototype, "customDetails", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => class_entity_1.Class, (gymClass) => gymClass.sessionSchedule),
    __metadata("design:type", class_entity_1.Class)
], SessionSchedule.prototype, "class", void 0);
SessionSchedule = __decorate([
    (0, typeorm_1.Entity)('session_schedule')
], SessionSchedule);
exports.SessionSchedule = SessionSchedule;
//# sourceMappingURL=session-schedule.entity.js.map