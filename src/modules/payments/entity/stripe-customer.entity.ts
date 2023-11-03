import { Column, Entity, Generated, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/utils/base.model';
import { User } from 'src/modules/user/entity/user.entity';

@Entity('stripe_customers')
export class StripeCustomer extends BaseModel {
  @ApiProperty({
    description: 'UUID',
    example: '2jjaUnp8ZC2WJbNioH8ugD',
  })
  @Column()
  @Generated('uuid')
  uuid: string;

  @ManyToOne('User')
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'customer_id', unique: true })
  customerId: string;
}
