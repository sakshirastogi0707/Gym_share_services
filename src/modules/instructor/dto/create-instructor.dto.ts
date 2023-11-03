import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxDate,
  MinDate,
} from 'class-validator';
import { TrainedForDataModel } from './trained_for.model';
import { Certificate } from './certificate.model';
import { BaseResponseDto } from 'src/utils/base.response.dto';
export class CreateInstructorDto {
  @ApiProperty({
    description: 'Instructor Name',
    example: 'Kelly Archer',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Photo',
    example: 'picture://pic',
  })
  @IsNotEmpty()
  @IsString()
  photo: string;

  @ApiProperty({
    name: 'trainedFor',
    type: () => [TrainedForDataModel],
  })
  @IsNotEmpty()
  trainedFor: [TrainedForDataModel];

  @ApiProperty({
    description: 'About',
    example: 'Very motivational and helpful whenever approached',
  })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty({
    description: 'Experience in years',
    example: 5,
  })
  @IsNotEmpty()
  expYears: number;

  @ApiProperty({
    description: 'Experience in months',
    example: 5,
  })
  @IsNotEmpty()
  expMonths: number;

  @ApiProperty({
    description: 'Date of birth',
    example: '1994-02-26',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @MinDate(new Date('1900-01-01'))
  @MaxDate(new Date())
  dob: Date;

  @ApiProperty({
    description: 'Gym Id',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;

  @ApiProperty({
    name: 'certificates',
    type: () => [Certificate],
  })
  certificates: [Certificate];
}

export class CreateInstructorSuccessDto extends BaseResponseDto {
  @ApiProperty()
  data: CreateInstructorDto;
}

export class UpdateInstructorDto {
  @ApiProperty({
    description: 'Instructor Name',
    example: 'Kelly Archer',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Photo',
    example: 'picture://pic',
  })
  @IsString()
  @IsOptional()
  photo: string;

  @ApiProperty({
    name: 'trainedFor',
    type: () => [TrainedForDataModel],
  })
  @IsOptional()
  trainedFor: [TrainedForDataModel];

  @ApiProperty({
    description: 'About',
    example: 'Very motivational and helpful whenever approached',
  })
  @IsString()
  @IsOptional()
  about: string;

  @ApiProperty({
    description: 'Experience in years',
    example: 5,
  })
  @IsOptional()
  expYears: number;

  @ApiProperty({
    description: 'Experience in months',
    example: 5,
  })
  @IsOptional()
  expMonths: number;

  @ApiProperty({
    description: 'Date of birth',
    example: '1994-02-26',
  })
  @Type(() => Date)
  @IsOptional()
  dob: Date;

  @ApiProperty({
    description: 'Gym Id',
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  gymId: number;

  @ApiProperty({
    name: 'certificates',
    type: () => [Certificate],
  })
  @IsOptional()
  certificates: [Certificate];
}

export class UpdateInstructorResponseSuccessDto extends BaseResponseDto {
  @ApiProperty({
    name: 'data',
  })
  data: UpdateInstructorDto;
}
export class GetAllInstructorResponseSuccessDto extends BaseResponseDto {
  @ApiProperty({
    name: 'data',
    type: () => [CreateInstructorDto],
  })
  data: [CreateInstructorDto];
}
