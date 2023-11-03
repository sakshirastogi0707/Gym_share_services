import { ApiProperty } from '@nestjs/swagger';
import { GymSubCategoryDataDto } from './gym-subcategory-data.dto';

export class GymCategoryDataDto {
  @ApiProperty({
    name: 'id',
  })
  id: string;
  @ApiProperty({
    name: 'name',
  })
  name: string;
  @ApiProperty({
    name: 'subCategory',
    type: () => [GymSubCategoryDataDto],
  })
  subCategory: [GymSubCategoryDataDto];
  @ApiProperty({
    name: 'orderID',
  })
  orderID: string;
}
