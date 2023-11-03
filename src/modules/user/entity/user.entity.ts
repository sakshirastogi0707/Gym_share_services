import {
  Column,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToMany,
} from 'typeorm';
import { BaseModel } from 'src/utils/base.model';
import { ILocation } from 'src/interfaces/user-location.interface';
import { UserCategorySubCategory } from './user.category.subcategory.entity';
import { Gym } from 'src/modules/gym/entities/gym.entity';
import { EnumTransformer } from 'src/utils/transformer/enum.transformer.utils';
import { SourceType } from 'src/enums/source-type.enum';
import { Favourites } from '../../class/entities/favourites.entity';
import { Payment } from 'src/modules/payments/entity/payments.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';

@Entity('users')
export class User extends BaseModel {
  @OneToMany(() => UserCategorySubCategory, (ucs) => ucs.user)
  userCategorySubcategories: UserCategorySubCategory[];

  @OneToMany(() => Gym, (gym) => gym.user)
  gyms: Gym[];

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({
    name: 'full_name',
    length: 100,
    nullable: true,
  })
  fullName: string;

  @Column({
    name: 'email_id',
    nullable: true,
    length: 100,
  })
  emailId: string;

  @Column({
    name: 'phone_number',
    length: 50,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: 'location',
    type: 'simple-json',
    nullable: true,
  })
  location: ILocation;

  @Column({
    name: 'profile_pic',
    nullable: true,
  })
  profilePic: string;

  @Column({
    name: 'birth_date',
    type: 'date',
    nullable: true,
  })
  birthDate: Date;

  @Column({
    name: 'firebase_uuid',
    length: 100,
    nullable: true,
  })
  firebaseUuid: string;

  @Column({
    name: 'document_certificate',
    nullable: true,
    type: 'jsonb',
  })
  documentCertificate: [string];

  @Column({
    name: 'experience_level',
    nullable: true,
  })
  experienceLevel: string;

  @Column({
    name: 'step_name',
    nullable: true,
  })
  stepName: string;

  @Column({
    name: 'user_type',
    nullable: false,
  })
  userType: number;

  @Column('simple-array', {
    name: 'medical_history',
    nullable: true,
  })
  medicalHistory: string[];

  @Column({
    name: 'is_active',
    nullable: true,
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'user_status',
    nullable: false,
  })
  userStatus: number;

  @Column({
    type: 'integer',
    transformer: new EnumTransformer(SourceType),
    nullable: true,
  })
  source: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    name: 'address',
    nullable: true,
  })
  address: string;

  @OneToMany(() => Favourites, (fv) => fv.user)
  favourites: Favourites[];

  @OneToMany(() => Payment, (fv) => fv.user)
  paymentMethod: Payment[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
