import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StripeCustomer } from './entity/stripe-customer.entity';

@Injectable()
export class StripeCustomerService {
  constructor(
    @InjectRepository(StripeCustomer)
    private stripeCustomerRepo: Repository<StripeCustomer>,
  ) {}

  async getCustomerByUserId(userId: bigint) {
    return this.stripeCustomerRepo.findOne({
      where: { user: userId },
    });
  }

  async addCustomer(customer: any, userId: bigint) {
    const model = {
      user: {
        id: userId,
      },
      customerId: customer.id,
    };
    return this.stripeCustomerRepo.create(model).save();
  }
}
