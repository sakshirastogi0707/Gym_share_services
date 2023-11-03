import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { AmenitiyDataModal } from './amenities-data.dto';
import { AboutClass } from 'src/modules/class/dto/class.dto';
export class BasicGymDataDto {
  @ApiProperty({
    name: 'id',
  })
  @ApiProperty({
    name: 'businessName',
  })
  businessName: string;

  @ApiProperty({
    name: 'businessAddress',
  })
  businessAddress: string;

  @ApiProperty({
    name: 'photos',
  })
  photos: string;
  @ApiProperty({
    name: 'description',
  })
  description: string;

  @ApiProperty({
    name: 'status',
  })
  status: number;

  @ApiProperty({
    name: 'amenities',
    type: () => [AmenitiyDataModal],
  })
  amenities?: [AmenitiyDataModal];
}

export class BasicGymDataResponseDto extends BaseResponseDto {
  @ApiProperty({
    name: 'data',
  })
  data: BasicGymDataDto;
}
export class UserGymClassesDetailDto {
  @ApiProperty({
    description: 'Class Name',
    example: 'Yoga Class',
  })
  name: string;

  @ApiProperty({
    description: 'About Class',
  })
  about: AboutClass;

  @ApiProperty({
    description: 'Photo Thumbnail',
    example: 'Photo://thumb',
  })
  photoThumbnail: string;

  @ApiProperty({
    description: 'Duration',
    example: 60,
  })
  duration: number;
}
export class UserGymDetailData extends BasicGymDataDto {
  @ApiProperty({
    name: 'classes',
    type: () => [UserGymClassesDetailDto],
  })
  classes?: [UserGymClassesDetailDto];
}

export class UserGymDetailDataResponseDto {
  @ApiProperty({
    name: 'data',
  })
  data: UserGymDetailData;
}
