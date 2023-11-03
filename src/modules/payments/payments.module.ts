import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from 'src/middlewares/auth.middleware';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { Payment } from './entity/payments.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeCustomer } from './entity/stripe-customer.entity';
import { StripeService } from './stripe.service';
import { StripeCustomerService } from './stripe-customer.service';
import { EmailService } from '../../utils/email.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, StripeCustomer]),
    forwardRef(() => UserModule),
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    StripeService,
    StripeCustomerService,
    EmailService,
  ],
  exports: [StripeService, PaymentsService, StripeCustomerService],
})
export class PaymentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes(PaymentsController);
    consumer.apply(UserMiddleware).forRoutes(PaymentsController);
  }
}
