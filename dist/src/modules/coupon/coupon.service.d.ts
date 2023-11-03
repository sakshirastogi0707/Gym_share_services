import { CreateCouponDto } from './dto/create-coupon.dto';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { CouponListRequestParamsDto } from './dto/coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponService {
    private couponRepository;
    constructor(couponRepository: Repository<Coupon>);
    createCoupon(createCouponDto: CreateCouponDto): Promise<Coupon>;
    getCoupons(queryParams: CouponListRequestParamsDto): Promise<{
        status: boolean;
        message: string;
        data: {
            coupons: Coupon[];
            numberOfRecords: number;
        };
    } | {
        status: boolean;
        message: string;
        data: {
            coupons: Coupon[];
            numberOfRecords?: undefined;
        };
    }>;
    getCoupon(id: number): Promise<Coupon>;
    updateCouponById(id: number, updateCouponDto: UpdateCouponDto): Promise<{
        status: number;
        message: string;
        data: {
            modifiedAt: Date;
            name: string;
            description: string;
            expirationDate: Date;
            startingDate: Date;
            code: string;
            isExpired: boolean;
            isActive?: boolean;
            maxUsage: number;
            discount: number;
            id: bigint;
            createdAt: Date;
        };
    }>;
    deleteCouponById(id: number): Promise<{
        status: number;
        message: string;
    }>;
}
