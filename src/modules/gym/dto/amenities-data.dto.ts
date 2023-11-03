import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';

export class AmenitiyDataModal {
  @ApiProperty({
    name: 'id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    name: 'name',
    example: 'Sauna',
  })
  name: string;

  @ApiProperty({
    name: 'image',
    example: 'photo://base64',
  })
  image: string;

  @ApiProperty({
    name: 'active',
    example: 'True or False',
  })
  isActive: boolean;
}

export class AmentiesResponseDto extends BaseResponseDto {
  @ApiProperty({
    type: () => [AmenitiyDataModal],
  })
  data: [AmenitiyDataModal];
}
