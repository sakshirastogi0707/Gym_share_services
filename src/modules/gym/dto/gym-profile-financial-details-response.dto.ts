import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';

export class GymProfileFinancialSuccessDto extends BaseResponseDto {
  @ApiProperty({
    description: 'status',
    example: true,
  })
  status: boolean;

  @ApiProperty({
    description: 'message',
    example: 'Payment details updated successfully',
  })
  message: string;
}
