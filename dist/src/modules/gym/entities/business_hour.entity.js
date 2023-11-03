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
exports.Business_Hour = void 0;
const base_model_1 = require("../../../utils/base.model");
const typeorm_1 = require("typeorm");
const gym_entity_1 = require("./gym.entity");
let Business_Hour = class Business_Hour extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'day' }),
    __metadata("design:type", Number)
], Business_Hour.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'open_time', type: 'time' }),
    __metadata("design:type", String)
], Business_Hour.prototype, "open_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'close_time', type: 'time' }),
    __metadata("design:type", String)
], Business_Hour.prototype, "close_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'open24Hour', default: false }),
    __metadata("design:type", Boolean)
], Business_Hour.prototype, "open24Hour", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gym_entity_1.Gym, (gym) => gym.businessHours),
    __metadata("design:type", gym_entity_1.Gym)
], Business_Hour.prototype, "gym", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Business_Hour.prototype, "gymId", void 0);
Business_Hour = __decorate([
    (0, typeorm_1.Entity)('business_hours')
], Business_Hour);
exports.Business_Hour = Business_Hour;
//# sourceMappingURL=business_hour.entity.js.map