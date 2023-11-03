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
exports.Favourites = void 0;
const base_model_1 = require("../../../utils/base.model");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entity/user.entity");
const class_entity_1 = require("./class.entity");
let Favourites = class Favourites extends base_model_1.BaseModel {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (us) => us.favourites),
    __metadata("design:type", user_entity_1.User)
], Favourites.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => class_entity_1.Class),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", class_entity_1.Class)
], Favourites.prototype, "class", void 0);
Favourites = __decorate([
    (0, typeorm_1.Entity)('favourites')
], Favourites);
exports.Favourites = Favourites;
//# sourceMappingURL=favourites.entity.js.map