import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseUtils } from 'src/utils/base.utils';
import { Payment } from './payments.entity';

@Entity('lookup_payment_method')
export class LookupPaymentMethod extends BaseEntity {
  @ApiProperty({
    example: '1',
  })
  @PrimaryGeneratedColumn()
  public id: bigint;

  @ApiProperty({
    description: 'UUID',
    example: '2jjaUnp8ZC2WJbNioH8ugD',
  })
  @Column()
  uuid: string;

  @ApiProperty({
    description: 'Card Name',
    example: 'Master Credit Card',
  })
  @Column({ name: 'name' })
  name: string;

  @ApiProperty({
    description: 'Status of Card',
    example: 'true | false',
  })
  @Column({ name: 'active' })
  active: boolean;

  @OneToMany(() => Payment, (payment) => payment.paymentMethodId)
  payment: Payment;

  @ApiProperty({
    example: '2023-01-20 21:43:09',
  })
  @CreateDateColumn({ name: 'created_at', nullable: true })
  public createdDate: string;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdDate = BaseUtils.formatTimeUTC();
  }
}
