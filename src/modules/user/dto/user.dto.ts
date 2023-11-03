import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNotEmptyObject,
  ValidateNested,
  IsObject,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { LocationDto } from './location.dto';
import { Type } from 'class-transformer';
import { ExperienceLevel } from 'src/enums/experience-level.enum';
import { UserType } from 'src/enums/user-type.enum';
import { FitnessCategoryDto } from './fitness-category.dto';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { ProfileCategoryData } from './category-data.dto';

export class UserDto extends BaseResponseDto {
  @ApiProperty({
    description: 'Email Id',
    example: 'demouser@gmail.com',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @ApiProperty({
    description: 'Full Name',
    example: 'Himanshu Sharma',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+16701718980',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string | any;

  @ApiProperty({
    name: 'location',
    type: () => [LocationDto],
  })
  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty({
    description: 'Image file to upload',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public profilePic: string;

  @ApiProperty({
    description: 'Birthdate',
    example: 'yyyy-mm-dd',
  })
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty({
    description: 'List of all fitness experience',
    example: 'Beginner' || 'Experienced' || 'Intermediate',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: 'Medical History',
    example: ['Sugar', 'Pain', 'Fever', 'Etc.'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  medicalHistory: string[];

  @ApiProperty({
    description: 'Certificate documents file to upload',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public documentCertificate: string;

  @ApiProperty({
    description: 'UserType',
  })
  @IsNotEmpty()
  @IsEnum(UserType)
  public userType: UserType;

  @ApiProperty({
    name: 'userCategories',
    type: () => [FitnessCategoryDto],
  })
  userCategories?: [FitnessCategoryDto];
}

export class UserData {
  @ApiProperty({
    name: 'id',
  })
  id: number;
  @ApiProperty({
    name: 'emailId',
  })
  emailId: string;
  @ApiProperty({
    name: 'ownerPhonenumber',
  })
  ownerPhoneNumber: string;
  @ApiProperty({
    name: 'fullName',
  })
  fullName: string;

  @ApiProperty({
    name: 'birthDate',
  })
  birthDate: string;

  @ApiProperty({
    name: 'experienceLevel',
  })
  experienceLevel: string;

  @ApiProperty({
    name: 'medicalHistory',
  })
  medicalHistory: string;

  @ApiProperty({
    name: 'documentCertificate',
    example: ['string', 'string'],
  })
  documentCertificate: [string];

  @ApiProperty({
    name: 'UserType',
  })
  UserType: string;

  @ApiProperty({
    name: 'stepName',
  })
  stepName: string;

  @ApiProperty({
    name: 'location',
    type: () => [LocationDto],
  })
  location: [LocationDto];

  @ApiProperty({
    name: 'userCategories',
    type: () => [FitnessCategoryDto],
  })
  userCategories?: [FitnessCategoryDto];
}

export class UserDataModal extends BaseResponseDto {
  @ApiProperty({
    name: 'data',
  })
  data: UserData;
}

export class UpdateUserNameLocationRequestDto {
  @ApiProperty({
    description: 'Full Name',
    example: 'Babar Javaid',
  })
  @IsOptional()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsOptional()
  location: LocationDto;
}

export class UserNameLocationUpdateSuccessDto extends BaseResponseDto {
  @ApiProperty()
  data: UpdateUserNameLocationRequestDto;
}

export class UpdateUserSignupRequestDto {
  @ApiProperty({
    name: 'emailId',
  })
  @IsEmail()
  emailId: string;

  @ApiProperty({
    name: 'phoneNumber',
  })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    name: 'userType',
  })
  @IsEnum(UserType)
  public userType: UserType;
}

export class UpdateUserSignupSuccessDto extends BaseResponseDto {
  @ApiProperty()
  data: UserDto;
}

export class UpdateUserProfileCategoryRequestDto {
  @ApiProperty({
    description: 'Category Data in Array of Object',
    type: () => [ProfileCategoryData],
  })
  public categoryData: ProfileCategoryData[];
}

export class UserProfileCategoryUpdateSuccessDto extends BaseResponseDto {
  @ApiProperty({
    name: 'data',
  })
  data: [UpdateUserProfileCategoryRequestDto];
}

export class CreateEarlyUserSignupRequestDto {
  @ApiProperty({
    name: 'emailId',
  })
  @IsEmail()
  emailId: string;

  @ApiProperty({
    name: 'businessAddress',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    name: 'phoneNumber',
  })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    name: 'fullName',
  })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({
    name: 'userType',
  })
  @IsEnum(UserType)
  public userType: UserType;
}

export class MobileNumberDto {
  @ApiProperty({ required: true, example: '+918585858585' })
  number: string;
}
