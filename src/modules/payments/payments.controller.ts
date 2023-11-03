import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { GetStripePublishableKeySuccessDto } from './dto/get-stripe-publishable-key.response.dto';
import { StripeIntentSuccessDto } from './dto/stripe-intent.response.dto';
import { StripeService } from './stripe.service';
import { StripeIntentRequestDto } from './dto/stripe-intent.request.dto';
import { Request } from 'express';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { RefundPaymentDto } from './dto/payment.request.dto';
import { GetSavedCardsSuccessDTO } from './dto/saved-cards.dto';

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentService: PaymentsService,
    private readonly stripeService: StripeService,
  ) {}

  @Get('publishable-key')
  @ApiOkResponse({
    type: GetStripePublishableKeySuccessDto,
  })
  getPublishableKey() {
    return this.paymentService.getPublishableKey();
  }

  @Post('stripe-intent')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    type: StripeIntentSuccessDto,
  })
  createStripeIntent(
    @Body() body: StripeIntentRequestDto,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.stripeService.createStripeIntent(body, user);
  }

  @Post('refund-payment')
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  refundPayment(@Body() body: RefundPaymentDto) {
    return this.stripeService.refundPayment(body.transactionId);
  }

  @Get('/saved-cards')
  @ApiOkResponse({
    type: GetSavedCardsSuccessDTO,
  })
  async getSavedCards(@Req() req: Request) {
    const user = req['user'];
    return this.stripeService.getSavedCards(user.id);
  }
}
