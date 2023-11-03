import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { FitnessSubCategoryDto } from './fitness-subcategory.dto';
import { BaseResponseDto } from 'src/utils/base.response.dto';

export class FitnessCategoryDto extends BaseResponseDto {
  @ApiProperty({
    description: 'Name',
    example: 'Yoga and HIIT',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description',
    example: 'Yoga is key source of energy...',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Url of fitness icon',
    example: 'https://cdn.io/yux/img/src/101.jpeg',
  })
  @IsNotEmpty()
  @IsString()
  icon: string;

  @ApiProperty({
    description: 'Order Id',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty({
    name: 'subCategory',
    type: () => [FitnessSubCategoryDto],
  })
  subCategory: [FitnessSubCategoryDto];

  @ApiProperty({
    description: 'Status',
    type: 'boolean',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
