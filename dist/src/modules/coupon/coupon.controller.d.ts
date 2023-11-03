import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { CouponListRequestParamsDto } from './dto/coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponController {
    private couponService;
    constructor(couponService: CouponService);
    createCoupon(dto: CreateCouponDto): Promise<import("./entities/coupon.entity").Coupon>;
    getCoupons(queryParams: CouponListRequestParamsDto): Promise<{
        status: boolean;
        message: string;
        data: {
            coupons: import("./entities/coupon.entity").Coupon[];
            numberOfRecords: number;
        };
    } | {
        status: boolean;
        message: string;
        data: {
            coupons: import("./entities/coupon.entity").Coupon[];
            numberOfRecords?: undefined;
        };
    }>;
    getUserCoupons(queryParams: CouponListRequestParamsDto): Promise<{
        status: boolean;
        message: string;
        data: {
            coupons: import("./entities/coupon.entity").Coupon[];
            numberOfRecords: number;
        };
    } | {
        status: boolean;
        message: string;
        data: {
            coupons: import("./entities/coupon.entity").Coupon[];
            numberOfRecords?: undefined;
        };
    }>;
    getCouponById(id: number): Promise<import("./entities/coupon.entity").Coupon>;
    updateCouponById(id: number, dto: UpdateCouponDto): Promise<{
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
