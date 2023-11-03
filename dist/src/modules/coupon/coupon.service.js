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
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coupon_entity_1 = require("./entities/coupon.entity");
let CouponService = class CouponService {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }
    async createCoupon(createCouponDto) {
        const couponToSave = this.couponRepository.create(Object.assign({}, createCouponDto));
        const savedCoupon = await this.couponRepository.save(couponToSave);
        return savedCoupon;
    }
    async getCoupons(queryParams) {
        const query = this.couponRepository
            .createQueryBuilder('coupon')
            .select([
            'coupon.id',
            'coupon.name',
            'coupon.description',
            'coupon.code',
            'coupon.isExpired',
            'coupon.expirationDate',
            'coupon.startingDate',
            'coupon.isActive',
            'coupon.maxUsage',
            'coupon.discount',
        ])
            .where('coupon.isActive = :isActive', { isActive: true });
        if (queryParams.name) {
            query.where('coupon.name like :name', {
                name: `%${queryParams.name}%`,
            });
        }
        if (queryParams.expirationDateStart && queryParams.expirationDateEnd) {
            query.andWhere('coupon.expirationDate BETWEEN :expirationDateStart AND :expirationDateEnd', {
                expirationDateStart: queryParams.expirationDateStart,
                expirationDateEnd: queryParams.expirationDateEnd,
            });
        }
        if (queryParams.maxUsageMin !== undefined ||
            queryParams.maxUsageMax !== undefined) {
            if (queryParams.maxUsageMin !== undefined &&
                queryParams.maxUsageMax !== undefined) {
                query.andWhere('coupon.maxUsage BETWEEN :maxUsageMin AND :maxUsageMax', {
                    maxUsageMin: queryParams.maxUsageMin,
                    maxUsageMax: queryParams.maxUsageMax,
                });
            }
            else if (queryParams.maxUsageMin !== undefined) {
                query.andWhere('coupon.maxUsage >= :maxUsageMin', {
                    maxUsageMin: queryParams.maxUsageMin,
                });
            }
            else if (queryParams.maxUsageMax !== undefined) {
                query.andWhere('coupon.maxUsage <= :maxUsageMax', {
                    maxUsageMax: queryParams.maxUsageMax,
                });
            }
        }
        if (queryParams.discountMin !== undefined ||
            queryParams.discountMax !== undefined) {
            if (queryParams.discountMin !== undefined &&
                queryParams.discountMax !== undefined) {
                query.andWhere('coupon.discount BETWEEN :discountMin AND :discountMax', {
                    discountMin: queryParams.discountMin,
                    discountMax: queryParams.discountMax,
                });
            }
            else if (queryParams.discountMin !== undefined) {
                query.andWhere('coupon.discount >= :discountMin', {
                    discountMin: queryParams.discountMin,
                });
            }
            else if (queryParams.discountMax !== undefined) {
                query.andWhere('coupon.discount <= :discountMax', {
                    discountMax: queryParams.discountMax,
                });
            }
        }
        if (queryParams.code) {
            query.andWhere('coupon.code like :code', {
                code: `%${queryParams.code}%`,
            });
        }
        if (queryParams.isExpired !== undefined) {
            query.andWhere('coupon.isExpired = :isExpired', {
                isExpired: queryParams.isExpired,
            });
        }
        if (queryParams.page && queryParams.pageSize) {
            const count = await query.getCount();
            query.skip((queryParams.page - 1) * queryParams.pageSize);
            query.take(queryParams.pageSize);
            const coupons = await query.getMany();
            return {
                status: true,
                message: 'Coupons fetched successfully',
                data: { coupons, numberOfRecords: count },
            };
        }
        else {
            const coupons = await query.getMany();
            return {
                status: true,
                message: 'Coupons fetched successfully',
                data: { coupons },
            };
        }
    }
    async getCoupon(id) {
        const coupon = await this.couponRepository.findOne(id, {
            where: {
                isActive: true,
            },
            select: [
                'id',
                'name',
                'description',
                'code',
                'isExpired',
                'isActive',
                'expirationDate',
                'startingDate',
                'maxUsage',
                'discount',
            ],
        });
        if (!coupon) {
            throw new common_1.NotFoundException(`Coupon with ID ${id} not found `);
        }
        return coupon;
    }
    async updateCouponById(id, updateCouponDto) {
        try {
            const coupon = await this.couponRepository.findOne(id);
            if (!coupon) {
                throw new common_1.NotFoundException(`Coupon with id ${id} not found.`);
            }
            if (updateCouponDto.code !== undefined) {
                throw new common_1.BadRequestException(`Cannot update the 'code' field.`);
            }
            const updatedCoupon = Object.assign(Object.assign(Object.assign({}, coupon), updateCouponDto), { modifiedAt: new Date() });
            await this.couponRepository.save(updatedCoupon);
            return {
                status: 200,
                message: 'Coupon updated successfully!',
                data: updatedCoupon,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async deleteCouponById(id) {
        try {
            const coupon = await this.couponRepository.findOne(id, {
                where: {
                    isActive: true,
                },
            });
            if (!coupon) {
                throw new common_1.NotFoundException(`Coupon not found.`);
            }
            coupon.isActive = false;
            coupon.modifiedAt = new Date();
            await this.couponRepository.save(coupon);
            return {
                status: 200,
                message: 'Coupon deleted successfully!',
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message, error.getResponse());
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
CouponService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coupon_entity_1.Coupon)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CouponService);
exports.CouponService = CouponService;
//# sourceMappingURL=coupon.service.js.map