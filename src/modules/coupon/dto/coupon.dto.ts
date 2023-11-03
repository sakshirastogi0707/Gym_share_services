import { ApiProperty } from '@nestjs/swagger';

export class CouponListRequestParamsDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  expirationDateStart?: Date;

  @ApiProperty({ required: false })
  expirationDateEnd?: Date;

  @ApiProperty({ required: false })
  startingDate?: Date;

  @ApiProperty({ required: false })
  maxUsageMin?: number;

  @ApiProperty({ required: false })
  maxUsageMax?: number;

  @ApiProperty({ required: false })
  discountMin?: number;

  @ApiProperty({ required: false })
  discountMax?: number;

  @ApiProperty({ required: false })
  code?: string; // New property for filtering by code

  @ApiProperty({ required: false })
  isExpired?: boolean; // New property for filtering by isExpired

  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  pageSize?: number;
}
