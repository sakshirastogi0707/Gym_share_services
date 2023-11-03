import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsAlphanumeric,
  IsNumber,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ type: Date })
  expirationDate: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ type: Date })
  startingDate: Date;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'Code must be exactly 6 characters long' })
  @IsAlphanumeric()
  @ApiProperty()
  code: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isExpired = false;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isActive?: boolean = true;

  @IsNumber()
  @Min(1)
  @Max(7)
  @ApiProperty()
  @IsNotEmpty()
  maxUsage: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsNotEmpty()
  @ApiProperty()
  discount: number;
}
