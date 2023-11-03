import { ApiProperty } from '@nestjs/swagger';
import { GymCategoryDataModal } from './category-modal-data.dto';

export class GymProfileCategoryRequestDto {
  @ApiProperty({
    description: 'Category Data in Array of Object',
    type: () => [GymCategoryDataModal],
  })
  public categoryData: GymCategoryDataModal[];
}
