import { BaseEntity } from 'typeorm';
import { Payment } from './payments.entity';
export declare class LookupPaymentMethod extends BaseEntity {
    id: bigint;
    uuid: string;
    name: string;
    active: boolean;
    payment: Payment;
    createdDate: string;
    createDetails(): Promise<void>;
}
