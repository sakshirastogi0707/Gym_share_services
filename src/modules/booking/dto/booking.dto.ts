import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { CreateBookingDto } from './create-booking.dto';
import { User } from 'src/modules/user/entity/user.entity';

export class BookingResponseDto extends CreateBookingDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user: User;
}

export class CreateBookingSuccessDto extends BaseResponseDto {
  @ApiProperty()
  data: BookingResponseDto;
}
