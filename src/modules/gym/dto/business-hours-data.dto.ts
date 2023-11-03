import { ApiProperty } from '@nestjs/swagger';

export class TimeSlot {
  @ApiProperty({
    example: '6:00',
    name: 'openTime',
  })
  openTime?: string;

  @ApiProperty({
    example: '21:00',
    name: 'closeTime',
  })
  closeTime?: string;
}
