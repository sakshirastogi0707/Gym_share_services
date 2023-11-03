import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
export class PricingData {
  @ApiProperty({
    example: '10',
  })
  @IsNumber()
  session: number;

  @ApiProperty({
    example: '10',
  })
  @IsNumber()
  monthly: number;

  @ApiProperty({
    example: '10',
  })
  @IsNumber()
  class: number;
}
