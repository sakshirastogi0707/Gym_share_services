import { BaseModel } from 'src/utils/base.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Business_Hour } from './business_hour.entity';
import { Amenity } from './amenity.entity';
import { GymType, RegistrationMode } from 'src/enums/gym-profile.enum';
import { User } from 'src/modules/user/entity/user.entity';
import { GymCategorySubCategory } from './gym.category.subcategory.entity';
import { Instructor } from 'src/modules/instructor/entities/instructor.entity';
import { GymStatus } from 'src/enums/gym-type-status.enum';
import { Class } from 'src/modules/class/entities/class.entity';
import { FinancialDetails } from '../dto/financial-details.interface';

@Entity('gyms')
export class Gym extends BaseModel {
  @OneToMany(() => GymCategorySubCategory, (gcs) => gcs.gym)
  gymCategorySubcategories: GymCategorySubCategory[];

  @ApiProperty({
    description: 'Owner Email',
    example: 'benfrancis@gmail.com',
  })
  @Column({ name: 'owner_email', nullable: true, length: 100 })
  ownerEmail: string;

  @ApiProperty({
    description: 'Owner Phone Number',
    example: '+1 670 171 5629',
  })
  @Column({ name: 'owner_phone_number', length: 50, nullable: true })
  ownerPhoneNumber: string;

  @ApiProperty({
    description: 'Owner Name',
    example: 'Arnold Schwarzenegger',
  })
  @Column({ name: 'owner_name', nullable: true })
  ownerName: string;

  @ApiProperty({
    description: 'Owner Birthdate',
    example: '2023-04-15',
  })
  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate: Date;

  @ApiProperty({
    description: 'Business Name',
    example: 'Gold Gym',
  })
  @Column({ name: 'business_name', nullable: true })
  businessName: string;

  @ApiProperty({
    description: 'Business Email',
    example: 'contact@goldgym.com',
  })
  @Column({ name: 'business_email', nullable: true, length: 100 })
  businessEmail: string;

  @ApiProperty({
    description: 'Business Address',
    example: '27, Church Street, New York, NY, USA',
  })
  @Column({ name: 'business_address', nullable: true })
  businessAddress: string;

  @Column({ name: 'business_place_id', nullable: true })
  businessPlaceId: string;

  @ApiProperty({
    description: 'Business Contact',
    example: '+1 2345 6778',
  })
  @Column({ name: 'business_contact', nullable: true })
  businessContact: string;

  @ApiProperty({
    description: 'Communication Address',
    example: '27, Church Street, New York, NY, USA',
  })
  @Column({ name: 'communication_address', nullable: true })
  communicationAddress: string;

  @ApiProperty({
    description: 'Gym Logo',
    example: 'photo://gymlogo',
  })
  @Column({ name: 'photos', nullable: true })
  photos: string;

  @ApiProperty({
    description: 'Gym Logo',
    example: 'photo://gymlogo',
  })
  @Column({ name: 'cover_photo', nullable: true })
  coverPhoto: string;

  @ApiProperty({
    description: 'Category of Gym',
    example: GymType['WELLNESS CENTER'],
  })
  @Column({ name: 'category', nullable: true })
  category: number;

  @ApiProperty({
    description: 'description',
    example:
      'An American chain of international co-ed fitness centers originally started by Joe Gold in Venice Beach, California',
  })
  @Column({ name: 'description', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Step Name',
    example:
      'Owner' ||
      'Business' ||
      'Map' ||
      'Communication' ||
      'Financial' ||
      'About' ||
      'Hours' ||
      'Logo' ||
      'Waiver' ||
      'Category' ||
      'Amenities',
  })
  @Column({
    name: 'step_name',
    nullable: true,
  })
  stepName: string;

  @OneToMany(() => Business_Hour, (businessHours) => businessHours.gym)
  @JoinColumn({ name: 'gymId' })
  businessHours: Business_Hour[];

  @ApiProperty({
    description: 'Waiver',
    example: 'waiver data',
  })
  @Column({ name: 'waiver', nullable: true })
  waiver: string;

  @Column({ name: 'waiver_name', nullable: true })
  waiverName: string;

  @ApiProperty({
    description: 'amenities',
    example: ['Personal Trainer', 'Sauna'],
  })
  @ManyToMany(() => Amenity)
  @JoinTable()
  amenities: Amenity[];

  @ManyToOne(() => User, (user) => user.gyms)
  user: User;

  @ApiProperty({
    description: 'Financial Details',
    example: '',
  })
  @Column({ name: 'financial_details', type: 'json', nullable: true })
  financialDetails: FinancialDetails;

  @ApiProperty({
    description: 'Google Business Profile',
    example: 'Google-1234', //one to one
  })
  @Column({ name: 'google_business_profile', nullable: true })
  googleBusinessProfile: string; //one to one

  @ApiProperty({
    description: 'Registration Mode',
    example: RegistrationMode.APP,
  })
  @Column({ name: 'registrationMode', nullable: true })
  registrationMode: number;

  @ApiProperty({
    description: 'Gym Status',
    example: GymStatus.Pending,
  })
  @Column({
    name: 'status',
    nullable: false,
  })
  status: number;

  @OneToMany(() => Instructor, (instructor) => instructor.gym)
  instructors: Instructor[];

  @OneToMany(() => Class, (classGym) => classGym.gym)
  classes: Class[];

  @Column({ name: 'stripe_account_id', nullable: true })
  stripeAccountId: string;
}
