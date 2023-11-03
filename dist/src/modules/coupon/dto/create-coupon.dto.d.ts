export declare class CreateCouponDto {
    name: string;
    description: string;
    expirationDate: Date;
    startingDate: Date;
    code: string;
    isExpired: boolean;
    isActive?: boolean;
    maxUsage: number;
    discount: number;
}
