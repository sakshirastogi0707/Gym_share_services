import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { TimeSlot } from './business-hours-data.dto';
import { InstructorDataDto } from './instructor-data.dto';
import { AmenitiyDataModal } from './amenities-data.dto';
import { GymCategoryDataDto } from './gym-category-data.dto';
import { BasicGymDataDto } from './basic-gym-data.dto';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { GBHRequest } from './gym-profile-business-opearting-hours-request.dto';

class GymData extends BasicGymDataDto {
  @ApiProperty({
    name: 'id',
  })
  id: number;
  @ApiProperty({
    name: 'ownerEmail',
  })
  ownerEmail: string;
  @ApiProperty({
    name: 'ownerEmail',
  })
  ownerPhoneNumber: string;
  @ApiProperty({
    name: 'ownerEmail',
  })
  ownerName: string;

  @ApiProperty({
    name: 'birthDate',
  })
  birthDate: string;

  @ApiProperty({
    name: 'businessName',
  })
  businessName: string;

  @ApiProperty({
    name: 'businessEmail',
  })
  businessEmail: string;

  @ApiProperty({
    name: 'businessAddress',
  })
  businessAddress: string;

  @ApiProperty({
    name: 'businessContact',
  })
  businessContact: string;

  @ApiProperty({
    name: 'communicationAddress',
  })
  communicationAddress: string;

  @ApiProperty({
    name: 'photos',
  })
  photos: string;

  @ApiProperty({
    name: 'category',
  })
  category: number;

  @ApiProperty({
    name: 'stepName',
  })
  stepName: string;

  @ApiProperty({
    name: 'waiver',
  })
  waiver: string;

  @ApiProperty({
    example: 'waiver',
    name: 'waiverName',
  })
  waiverName: string;

  @ApiProperty({
    name: 'stripeAccountId',
  })
  stripeAccountId: string;

  @ApiProperty({
    name: 'googleBusinessProfile',
  })
  googleBusinessProfile: string;

  @ApiProperty({
    name: 'registrationMode',
  })
  registrationMode: string;

  @ApiProperty({
    name: 'about',
  })
  about: string;

  @ApiProperty({
    name: 'instructors',
    type: () => [InstructorDataDto],
  })
  instructors: [InstructorDataDto];

  @ApiProperty({
    name: 'businessHours',
    type: () => [TimeSlot],
  })
  businessHours?: [TimeSlot];

  @ApiProperty({
    name: 'gymCategories',
    type: () => [GymCategoryDataDto],
  })
  gymCategories?: [GymCategoryDataDto];

  @ApiProperty({
    name: 'amenities',
    type: () => [AmenitiyDataModal],
  })
  amenities?: [AmenitiyDataModal];
}

export class GymDataModal extends BaseResponseDto {
  @ApiProperty({
    name: 'data',
  })
  data: GymData;
}

export class GymUpdateRequestDto {
  @ApiProperty({
    name: 'businessName',
  })
  @IsOptional()
  @IsNotEmpty()
  businessName: string;

  @ApiProperty({
    example: 'this is the gym',
    maxLength: 500,
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(500)
  about: string;

  @ApiProperty({
    example: 'Trainer',
  })
  @IsOptional()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsNotEmpty()
  amenities: number[];

  @ApiProperty({
    type: () => [GBHRequest],
  })
  @IsOptional()
  @IsNotEmpty()
  businessHours: GBHRequest[];

  @ApiProperty({
    example: 'base64://',
  })
  @IsOptional()
  @IsNotEmpty()
  photos: string;

  @ApiProperty({
    example: 'base64://',
  })
  @IsOptional()
  @IsNotEmpty()
  coverPhoto: string;

  @ApiProperty({
    example: 'adsasd',
  })
  @IsOptional()
  @IsNotEmpty()
  waiver: string;

  @ApiProperty({
    example: 'adsasd',
  })
  @IsOptional()
  @IsNotEmpty()
  waiverName: string;
}
