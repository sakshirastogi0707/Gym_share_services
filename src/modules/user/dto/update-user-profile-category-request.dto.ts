import { ApiProperty } from '@nestjs/swagger';
import { ProfileCategoryData } from './category-data.dto';

export class UpdateUserProfileCategoryRequestDto {
  @ApiProperty({
    type: () => [ProfileCategoryData],
  })
  categoryData: ProfileCategoryData[];
}
