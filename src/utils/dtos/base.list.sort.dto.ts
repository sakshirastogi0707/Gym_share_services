import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseListDto } from './base.list.dto';

export class BaseListSortDto extends BaseListDto {
  @ApiProperty({
    description: 'class.name | class.spots | sessionSchedule.startDate',
    example: 'class.name',
    required: false,
  })
  @IsOptional()
  orderBy?: string;

  @ApiProperty({
    description: 'ASC | DESC',
    example: 'ASC',
    required: false,
  })
  @IsOptional()
  orderId?: 'ASC' | 'DESC';
}
