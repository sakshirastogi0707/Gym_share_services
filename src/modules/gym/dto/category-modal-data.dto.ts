import { ApiProperty } from '@nestjs/swagger';

export class GymCategoryDataModal {
  @ApiProperty()
  categoryId: number;

  @ApiProperty({
    example: [1],
  })
  subCategoryIds?: number[];
}
