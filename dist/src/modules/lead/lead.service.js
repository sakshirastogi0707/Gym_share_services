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
exports.LeadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lead_entity_1 = require("./entities/lead.entity");
const lead_type_enum_1 = require("../../enums/lead-type.enum");
let LeadService = class LeadService {
    constructor(leadRepository) {
        this.leadRepository = leadRepository;
    }
    async createLead(lead) {
        try {
            const createdLeadData = this.leadRepository.create(lead);
            if (createdLeadData.leadType === lead_type_enum_1.LeadType.GYM ||
                createdLeadData.leadType === lead_type_enum_1.LeadType.USER) {
                await this.leadRepository.save(createdLeadData);
            }
            return {
                status: true,
                message: 'Lead created successfully',
            };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.BadRequestException({
                    status: false,
                    message: 'Data already exists!',
                });
            }
            else {
                throw new common_1.InternalServerErrorException({
                    status: false,
                    message: (error === null || error === void 0 ? void 0 : error.message) || 'Unable to create lead, please try again.',
                });
            }
        }
    }
};
LeadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lead_entity_1.Lead)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LeadService);
exports.LeadService = LeadService;
//# sourceMappingURL=lead.service.js.map