import { ApiProperty } from '@nestjs/swagger';

export class GymSubCategoryDataDto {
  @ApiProperty({
    name: 'id',
  })
  id: string;
  @ApiProperty({
    name: 'name',
  })
  name: string;
  @ApiProperty({
    name: 'description',
  })
  description: string;
  @ApiProperty({
    name: 'orderID',
  })
  orderID: string;
}
