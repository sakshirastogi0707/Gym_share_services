import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../../utils/base.response.dto';
import Stripe from 'stripe';

class StripeIntentResponseDto {
  @ApiProperty({
    description: 'Stripe payment intent',
    example: {
      id: 'pi_1Dt1sb2eZvKYlo2CEaM1ZUhw',
      object: 'payment_intent',
      amount: 2000,
      amount_capturable: 0,
      amount_details: {
        tip: {},
      },
      amount_received: 0,
      application: null,
      application_fee_amount: null,
      automatic_payment_methods: {
        enabled: true,
      },
      canceled_at: null,
      cancellation_reason: null,
      capture_method: 'automatic',
      client_secret:
        'pi_1Dt1sb2eZvKYlo2CEaM1ZUhw_secret_0tJithEDKGo9KT8SqXuQyPsnO',
      confirmation_method: 'automatic',
      created: 1547597017,
      currency: 'usd',
      customer: null,
      description: null,
      invoice: null,
      last_payment_error: null,
      latest_charge: null,
      livemode: false,
      metadata: {},
      next_action: null,
      on_behalf_of: null,
      payment_method: null,
      payment_method_options: {},
      payment_method_types: ['card'],
      processing: null,
      receipt_email: null,
      redaction: null,
      review: null,
      setup_future_usage: null,
      shipping: null,
      statement_descriptor: null,
      statement_descriptor_suffix: null,
      status: 'requires_payment_method',
      transfer_data: null,
      transfer_group: null,
    },
  })
  paymentIntent: Stripe.PaymentIntent;

  @ApiProperty({
    description: 'Stripe customer id',
    example: 'cus_xraq79adf',
  })
  customerId: string;
}

export class StripeIntentSuccessDto extends BaseResponseDto {
  @ApiProperty({ type: () => StripeIntentResponseDto })
  public data;
}
