import { ApiProperty } from '@nestjs/swagger';

export class GymProfileAmenityRequestDto {
  @ApiProperty({
    description: 'Amenities Id',
    example: [1, 2, 3],
    isArray: true,
    type: Number,
  })
  public amenitiesIds: number[];
}
