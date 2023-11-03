import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../../utils/base.response.dto';

class SavedCardDTO {
  @ApiProperty({
    description: 'Card Id',
    example: 'pm_1NSylbBvww7E86b9J1hvzttx',
  })
  public id: string;

  @ApiProperty({
    description: 'Brand',
    example: 'visa',
  })
  brand: string;

  @ApiProperty({
    description: 'Funding',
    example: 'credit',
  })
  funding: string;

  @ApiProperty({
    description: 'Last 4 digits',
    example: '4242',
  })
  last4: string;

  @ApiProperty({
    description: 'Is default or not',
    example: true,
  })
  default: boolean;
}

export class GetSavedCardsSuccessDTO extends BaseResponseDto {
  @ApiProperty({ type: () => [SavedCardDTO] })
  data: [SavedCardDTO];
}
