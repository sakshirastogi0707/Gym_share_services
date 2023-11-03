import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/utils/base.model';
import { LookupPaymentMethod } from './lookup-payment-method.entity';
import { User } from 'src/modules/user/entity/user.entity';

@Entity('payments')
export class Payment extends BaseModel {
  @ApiProperty({
    description: 'UUID',
    example: '2jjaUnp8ZC2WJbNioH8ugD',
  })
  @Column()
  uuid: string;

  @ManyToOne(() => User, (user) => user.paymentMethod)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({
    description: 'Payment method id',
    example: '1231216768',
  })
  @ManyToOne(
    () => LookupPaymentMethod,
    (lookuppaymentmethod) => lookuppaymentmethod.payment,
  )
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethodId: LookupPaymentMethod;

  @ApiProperty({
    description: 'Card holder name',
    example: 'inderkant khandelwal',
  })
  @Column({ length: 100, name: 'card_holder_name' })
  cardHolderName: string;

  @ApiProperty({
    description: 'Card number',
    example: '1234 5678 6738 3334',
  })
  @Column({ length: 20, name: 'card_number' })
  cardNumber: string;

  @ApiProperty({
    description: 'Default card ',
    example: 'true | false',
  })
  @Column({ name: 'default_card', default: false })
  defaultCard: boolean;

  @ApiProperty({
    description: 'Expiry date',
    example: '07 / 28',
  })
  @Column({ name: 'expiry_date' })
  expiryDate: Date;
}
