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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Repository_1 = require("typeorm/repository/Repository");
const amenity_entity_1 = require("./entities/amenity.entity");
let AmenityService = class AmenityService {
    constructor(amenityRepository) {
        this.amenityRepository = amenityRepository;
    }
    async getAllAmenities() {
        const data = await this.amenityRepository.find({
            select: ['id', 'name', 'orderId', 'image', 'isActive'],
            where: {
                isActive: true,
            },
            order: {
                orderId: 'ASC',
                name: 'ASC',
            },
        });
        return data;
    }
};
AmenityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(amenity_entity_1.Amenity)),
    __metadata("design:paramtypes", [Repository_1.Repository])
], AmenityService);
exports.AmenityService = AmenityService;
//# sourceMappingURL=amenity.service.js.map