export declare class CouponListRequestParamsDto {
    name?: string;
    expirationDateStart?: Date;
    expirationDateEnd?: Date;
    startingDate?: Date;
    maxUsageMin?: number;
    maxUsageMax?: number;
    discountMin?: number;
    discountMax?: number;
    code?: string;
    isExpired?: boolean;
    page?: number;
    pageSize?: number;
}
