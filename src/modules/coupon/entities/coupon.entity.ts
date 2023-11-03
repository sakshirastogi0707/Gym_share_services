import { Entity, Column, Unique } from 'typeorm';
import { BaseModel } from 'src/utils/base.model';

@Entity('coupon')
@Unique(['code']) // Enforce uniqueness on the code column
export class Coupon extends BaseModel {
  @Column({ type: 'varchar', length: 6, unique: true }) // Unique decorator enforces uniqueness
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  expirationDate: Date;

  @Column({ type: 'timestamp' })
  startingDate: Date;

  @Column({ type: 'boolean', default: false })
  isExpired: boolean;

  @Column({ type: 'boolean', default: true })
  isActive?: boolean;

  @Column({ type: 'integer' })
  maxUsage: number;

  @Column({ type: 'numeric' })
  discount: number;
}
