import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { StripeIntentRequestDto } from './dto/stripe-intent.request.dto';
import { User } from '../user/entity/user.entity';
import { StripeCustomerService } from './stripe-customer.service';
export declare class StripeService {
    private readonly configService;
    private readonly stripeCustomerService;
    private stripe;
    constructor(configService: ConfigService, stripeCustomerService: StripeCustomerService);
    createStripeIntent(body: StripeIntentRequestDto, user: User): Promise<{
        status: boolean;
        message: string;
        data: {
            paymentIntent: Stripe.Response<Stripe.PaymentIntent>;
            customerId: string;
            ephemeralKey: string;
        };
    }>;
    getStripeConnectUrl(stripeAccountId: string): Promise<{
        stripeAccountId: string;
        object: "account_link";
        created: number;
        expires_at: number;
        url: string;
        lastResponse: {
            headers: {
                [key: string]: string;
            };
            requestId: string;
            statusCode: number;
            apiVersion?: string;
            idempotencyKey?: string;
            stripeAccount?: string;
        };
    }>;
    capturePaymentByTransactionId(transactionId: string): Promise<{
        status: boolean;
        message: string;
        data: Stripe.Response<Stripe.PaymentIntent>;
    }>;
    refundPayment(chargeId: string): Promise<{
        status: boolean;
        message: any;
        data: any;
    }>;
    getSavedCards(userId: bigint): Promise<{
        status: boolean;
        message: string;
        data: {
            id: string;
            brand: string;
            funding: string;
            last4: string;
            default: boolean;
        }[];
    } | {
        status: boolean;
        message: any;
        data?: undefined;
    }>;
}
