import { Repository } from 'typeorm';
import { StripeCustomer } from './entity/stripe-customer.entity';
export declare class StripeCustomerService {
    private stripeCustomerRepo;
    constructor(stripeCustomerRepo: Repository<StripeCustomer>);
    getCustomerByUserId(userId: bigint): Promise<StripeCustomer>;
    addCustomer(customer: any, userId: bigint): Promise<StripeCustomer>;
}
