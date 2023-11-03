import { BaseModel } from 'src/utils/base.model';
export declare class Coupon extends BaseModel {
    code: string;
    name: string;
    description: string;
    expirationDate: Date;
    startingDate: Date;
    isExpired: boolean;
    isActive?: boolean;
    maxUsage: number;
    discount: number;
}
