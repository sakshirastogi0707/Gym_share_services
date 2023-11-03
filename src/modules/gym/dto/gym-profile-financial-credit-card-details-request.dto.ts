import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class GymProfileFinancialCreditCardRequestDto {
  @ApiProperty({
    description: 'Card Number ',
    example: '5555555555554444	',
  })
  @IsNotEmpty()
  @MaxLength(16, {
    message: 'Credit card number must be at most 16 digits long.',
  })
  @IsString()
  cardNumber: string;

  @ApiProperty({
    description: 'Expiry Date (e.g., 07/23)',
    example: '07-23',
  })
  @IsNotEmpty()
  @Matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
    message: 'Expiry date must be in the format MM/YY (e.g., 07/23)',
  })
  @IsString()
  expiryDate: string;
}
