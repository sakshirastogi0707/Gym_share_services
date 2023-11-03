import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../../utils/base.response.dto';

export class GetStripePublishableKeySuccessDto extends BaseResponseDto {
  @ApiProperty({
    description: 'Stripe publishable key',
    example:
      'pk_test_GdKqRexjEn4Jgvww7E86b0ElOkU5LApttMwRrYo1MgNXUBHEw6ESd007chualrtoTOhMq1QZ0emjuhvGBxAz974E0w3NpDTTpr9',
  })
  public data;
}
