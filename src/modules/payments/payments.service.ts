import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly configService: ConfigService,
  ) {}

  async getPublishableKey() {
    const data = this.configService.get<string>('STRIPE_PK');

    return {
      status: true,
      message: 'Stripe Publishable Key',
      data,
    };
  }
}
