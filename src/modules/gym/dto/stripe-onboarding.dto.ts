import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';

export class StripeConnectOnboardingResponse extends BaseResponseDto {
  @ApiProperty({
    example: {
      object: 'account_link',
      created: 1692646083,
      expires_at: 1692646383,
      url: 'https://connect.stripe.com/setup/s/asdasd/7Hp7N1nHWSkC',
    },
  })
  data: object;
}
