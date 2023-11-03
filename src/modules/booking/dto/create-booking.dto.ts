import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsIn,
  IsArray,
} from 'class-validator';
import { AddOnsDataModel } from 'src/modules/class/dto/add-ons-data.dto';
import { SomeoneElseModel } from './someoneElse.dto';
import { BaseUtils } from 'src/utils/base.utils';
import { BookingFor } from 'src/enums/booking.enum';

export class CreateBookingDto {
  @ApiProperty({
    description: 'Class ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  class: number;

  @ApiProperty({
    description: 'Session ID',
    example: [1],
    isArray: true,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  sessions: number[];

  @ApiProperty({
    description: 'Booking For',
    example: BaseUtils.getEnumKeys(BookingFor).join('/'),
  })
  @IsIn(BaseUtils.getEnumKeys(BookingFor), {
    message: `Booking for can only be ${BaseUtils.getEnumKeys(BookingFor)}`,
  })
  bookingFor: string;

  @ApiProperty({
    description: 'Add Ons',
    type: () => [AddOnsDataModel],
  })
  @IsOptional()
  addOns: AddOnsDataModel[];

  @ApiProperty({
    description: 'Coupon',
    example: 'flat50',
  })
  @IsOptional()
  coupon: string;

  @ApiProperty({
    description: 'is Booking for Someone else',
    example: true,
  })
  @IsOptional()
  isForSomeoneElse: boolean;

  @ApiProperty({
    description: 'Someone else',
    type: () => SomeoneElseModel,
  })
  @IsOptional()
  someoneElse: SomeoneElseModel;
}
