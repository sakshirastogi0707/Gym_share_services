import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class StripeIntentRequestDto {
  @ApiProperty({
    description: 'Amount',
    example: 2,
  })
  @IsNumber()
  amount: number;
}
