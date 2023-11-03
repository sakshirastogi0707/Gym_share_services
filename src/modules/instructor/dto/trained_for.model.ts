import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class TrainedForDataModel {
  @ApiProperty({
    name: 'categoryId',
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    name: 'subCategoryIds',
    example: [1, 2],
  })
  @IsNumber()
  @IsArray()
  subCategoryIds?: number[];
}
