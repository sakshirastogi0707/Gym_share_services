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
exports.StripeCustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stripe_customer_entity_1 = require("./entity/stripe-customer.entity");
let StripeCustomerService = class StripeCustomerService {
    constructor(stripeCustomerRepo) {
        this.stripeCustomerRepo = stripeCustomerRepo;
    }
    async getCustomerByUserId(userId) {
        return this.stripeCustomerRepo.findOne({
            where: { user: userId },
        });
    }
    async addCustomer(customer, userId) {
        const model = {
            user: {
                id: userId,
            },
            customerId: customer.id,
        };
        return this.stripeCustomerRepo.create(model).save();
    }
};
StripeCustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stripe_customer_entity_1.StripeCustomer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StripeCustomerService);
exports.StripeCustomerService = StripeCustomerService;
//# sourceMappingURL=stripe-customer.service.js.map