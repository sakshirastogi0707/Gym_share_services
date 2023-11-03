import { AddOnsDataModel } from 'src/modules/class/dto/add-ons-data.dto';
import { Class } from 'src/modules/class/entities/class.entity';
import { Session } from 'src/modules/class/entities/session.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { BaseModel } from 'src/utils/base.model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { SomeoneElseModel } from '../dto/someoneElse.dto';
import { BookingFor, BookingStatus } from 'src/enums/booking.enum';
import { EnumTransformer } from 'src/utils/transformer/enum.transformer.utils';

@Entity('bookings')
export class Booking extends BaseModel {
  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Class, (fitnessClass) => fitnessClass.bookings)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToMany(() => Session)
  @JoinTable()
  sessions: Session[];

  @Column({
    name: 'booking_for',
    type: 'integer',
    transformer: new EnumTransformer(BookingFor),
    nullable: false,
  })
  bookingFor: string;

  @Column({ name: 'booking_time', type: 'timestamp', nullable: true })
  bookingTime: Date;

  @Column({ name: 'coupon', nullable: true })
  coupon: string;

  @Column({ name: 'add_ons', type: 'jsonb', nullable: true })
  addOns: AddOnsDataModel[];

  @Column({ name: 'isSomeoneElse', type: 'boolean', default: false })
  isForSomeoneElse: boolean;

  @Column({ name: 'someoneElse', type: 'jsonb', nullable: true })
  someoneElse: SomeoneElseModel;

  @Column({
    type: 'integer',
    transformer: new EnumTransformer(BookingStatus),
    nullable: true,
    default: BookingStatus.Request,
  })
  status: string;

  @Column({ name: 'active', type: 'boolean', default: true })
  isActive: boolean;
}
