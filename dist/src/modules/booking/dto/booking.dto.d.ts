import { BaseResponseDto } from 'src/utils/base.response.dto';
import { CreateBookingDto } from './create-booking.dto';
import { User } from 'src/modules/user/entity/user.entity';
export declare class BookingResponseDto extends CreateBookingDto {
    id: number;
    user: User;
}
export declare class CreateBookingSuccessDto extends BaseResponseDto {
    data: BookingResponseDto;
}
