import { BaseModel } from 'src/utils/base.model';
import { User } from 'src/modules/user/entity/user.entity';
export declare class StripeCustomer extends BaseModel {
    uuid: string;
    user: User;
    customerId: string;
}
