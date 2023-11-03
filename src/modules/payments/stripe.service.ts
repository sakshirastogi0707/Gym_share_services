import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { StripeIntentRequestDto } from './dto/stripe-intent.request.dto';
import { BaseUtils } from '../../utils/base.utils';
import { User } from '../user/entity/user.entity';
import { StripeCustomerService } from './stripe-customer.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly stripeCustomerService: StripeCustomerService,
  ) {
    const STRIPE_SK = this.configService.get<string>('STRIPE_SK');
    this.stripe = new Stripe(STRIPE_SK, {
      apiVersion: '2022-11-15',
    });
  }

  async createStripeIntent(body: StripeIntentRequestDto, user: User) {
    let customer = await this.stripeCustomerService.getCustomerByUserId(
      user.id,
    );
    if (!customer) {
      const newCustomer = await this.stripe.customers.create({
        name: user.fullName,
        email: user.emailId,
      });
      customer = await this.stripeCustomerService.addCustomer(
        newCustomer,
        user.id,
      );
    }
    const customerId = customer.customerId;
    const ephemeralKey = await this.stripe.ephemeralKeys.create(
      { customer: customerId },
      { apiVersion: '2022-11-15' },
    );
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        customer: customerId,
        payment_method_types: ['card'],
        amount: BaseUtils.roundOff(body.amount * 100), // $ to cent conversion
        currency: 'usd',
        capture_method: 'manual',
      });
      return {
        status: true,
        message: 'Stripe payment intent created',
        data: {
          paymentIntent,
          customerId,
          ephemeralKey: ephemeralKey.secret,
        },
      };
    } catch (e) {
      throw new BadRequestException({
        status: false,
        message:
          e?.message || 'Unable to create payment intent, please try again.',
      });
    }
  }

  async getStripeConnectUrl(stripeAccountId: string) {
    const account = stripeAccountId
      ? { id: stripeAccountId }
      : await this.stripe.accounts.create({
          type: 'standard',
        });
    const accountLink = await this.stripe.accountLinks.create({
      account: account.id,
      refresh_url: this.configService.get<string>('STRIPE_REFRESH_URL'),
      return_url: this.configService.get<string>('STRIPE_REDIRECT_URL'),
      type: 'account_onboarding',
    });
    return { ...accountLink, stripeAccountId };
  }

  async capturePaymentByTransactionId(transactionId: string) {
    try {
      const result = await this.stripe.paymentIntents.capture(transactionId);
      return {
        status: true,
        message: 'Stripe payment captured successfully',
        data: result,
      };
    } catch (e) {
      throw new BadRequestException({
        status: false,
        message: e?.message || 'Payment not captured, please try again.',
        data: e.payment_intent,
      });
    }
  }

  async refundPayment(chargeId: string) {
    try {
      const result = await this.stripe.refunds.create({
        payment_intent: chargeId,
      });
      return {
        status: true,
        message: 'Refund completed.',
        data: result,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.message || 'Refund not completed, please try again.',
        data: e?.payment_intent,
      };
    }
  }

  async getSavedCards(userId: bigint) {
    try {
      const customer = await this.stripeCustomerService.getCustomerByUserId(
        userId,
      );
      const customerId = customer?.customerId;
      const paymentMethods = await this.stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });
      const cards = paymentMethods.data.map((paymentMethod) => {
        const { card } = paymentMethod;
        return {
          id: paymentMethod.id,
          brand: card.brand,
          funding: card.funding,
          last4: card.last4,
          default: false,
        };
      });
      return {
        status: true,
        message: 'Saved cards.',
        data: cards,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.message || 'Unable to retrieve saved cards.',
      };
    }
  }
}
