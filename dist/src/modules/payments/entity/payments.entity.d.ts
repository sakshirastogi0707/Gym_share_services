import { BaseModel } from 'src/utils/base.model';
import { LookupPaymentMethod } from './lookup-payment-method.entity';
import { User } from 'src/modules/user/entity/user.entity';
export declare class Payment extends BaseModel {
    uuid: string;
    user: User;
    paymentMethodId: LookupPaymentMethod;
    cardHolderName: string;
    cardNumber: string;
    defaultCard: boolean;
    expiryDate: Date;
}
