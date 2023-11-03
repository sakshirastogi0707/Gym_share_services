import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GymProfileFinancialAchDetailsRequestDto {
  @ApiProperty({
    description: 'Bank Name',
    example: 'Wells Fargo',
  })
  @IsNotEmpty()
  @IsString()
  bankName: string;

  @ApiProperty({
    description: 'Account Number',
    example: '4111111111111111',
  })
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty({
    description: 'Bank Code',
    example: 'WFBI',
  })
  @IsNotEmpty()
  @IsString()
  bankCode: string;
}
