import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class RefundPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  transactionId: string;
}
