import { ApiProperty } from '@nestjs/swagger';

export class ProfileCategoryData {
  @ApiProperty()
  categoryId: number;

  @ApiProperty({
    example: [1],
  })
  subCategoryIds?: number[];
}
