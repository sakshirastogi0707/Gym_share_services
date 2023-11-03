import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsIn,
  ValidateNested,
  IsNotEmptyObject,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { AddOnsDataModel } from './add-ons-data.dto';
import {
  SessionScheduleDto,
  UpdateSessionScheduleDto,
} from './session-schedule.dto';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { Difficulty, ClassStatus } from 'src/enums/class.enum';
import { BaseUtils } from '../../../utils/base.utils';
import { Type } from 'class-transformer';
import { PricingData } from './pricing.dto';
import { BaseListDto } from 'src/utils/dtos/base.list.dto';
import { BaseListSortDto } from 'src/utils/dtos/base.list.sort.dto';

export class AboutClass {
  @ApiProperty({
    example: 'lorem ipsum',
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsOptional()
  @MaxLength(200)
  description: string;

  @ApiProperty({
    example: '250',
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsNumber()
  estimated_calorie_burn: number;

  @ApiProperty({
    example: 'core,thigh',
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  targeted_body_parts: string;
}

export class UpdateAboutClass {
  @ApiProperty({
    example: 'lorem ipsum',
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsOptional()
  @MaxLength(200)
  description: string;

  @ApiProperty({
    example: '250',
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsNumber()
  estimated_calorie_burn: number;

  @ApiProperty({
    example: 'core,thigh',
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  targeted_body_parts: string;
}
export class ClassDto {
  @ApiProperty({
    description: 'Class Name',
    example: 'Yoga Class',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Spots',
    example: 40,
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsNotEmpty()
  @IsNumber()
  spots: number;

  @ApiProperty({
    description: 'About Class',
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  about: AboutClass;

  @ApiProperty({
    description: 'About Class',
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  pricing: PricingData;

  @ApiProperty({
    description: 'Add Ons',
    type: () => [AddOnsDataModel],
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  addOns: AddOnsDataModel[];

  @ApiProperty({
    description: 'Difficulty',
    example: `${BaseUtils.getEnumKeys(Difficulty).join('/')}`,
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsNotEmpty()
  @IsIn(BaseUtils.getEnumKeys(Difficulty), {
    message: `Diffculty can only be ${BaseUtils.getEnumKeys(Difficulty)}`,
  })
  difficulty: string;

  @ApiProperty({
    description: 'Equipments Required',
    example: 'Bring your own towels',
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsString()
  equipmentsRequired: string;

  @ApiProperty({
    description: 'Photo Thumbnail',
    example: 'Photo://thumb',
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsString()
  photoThumbnail: string;

  @ApiProperty({
    description: 'Photo Cover',
    example: 'Photo://cover',
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsString()
  photoCover: string;

  @ApiProperty({
    description: 'Instructor ID',
    example: 1,
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsNotEmpty()
  @IsNumber()
  instructor: number;

  @ApiProperty({
    description: 'Fitness Category ID',
    example: 1,
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsNotEmpty()
  @IsNumber()
  category: number;

  @ApiProperty({
    description: 'Fitness Sub Category ID',
    example: [1, 2],
    isArray: true,
    type: [Number],
  })
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  subCategories: number[];

  @ApiProperty({
    description: 'Session Schedule',
    type: () => SessionScheduleDto,
  })
  @Type(() => SessionScheduleDto)
  @ValidateIf((o) => o.status === ClassStatus[ClassStatus.Published])
  @ValidateNested()
  @IsNotEmptyObject()
  sessionSchedule: SessionScheduleDto;

  @ApiProperty({
    description: 'Status',
    example: BaseUtils.getEnumKeys(ClassStatus).join('/'),
  })
  @IsIn(BaseUtils.getEnumKeys(ClassStatus), {
    message: `Status can only be ${BaseUtils.getEnumKeys(ClassStatus)}`,
  })
  status: string;
}

export class ClassResponseDto extends ClassDto {
  @ApiProperty()
  id: number;
}

export class CreateClassSuccessDto extends BaseResponseDto {
  @ApiProperty()
  data: ClassResponseDto;
}

export class ListClassSuccessDto extends BaseResponseDto {
  @ApiProperty({
    type: () => [ClassResponseDto],
  })
  data: [ClassResponseDto];
}

export class UpdateClassDataDto {
  @ApiProperty({
    description: 'Class Name',
    example: 'Yoga Class',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Spots',
    example: 40,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  spots: number;

  @ApiProperty({
    description: 'About Class',
  })
  @IsOptional()
  about: UpdateAboutClass;

  @ApiProperty({
    description: 'Pricing',
  })
  @IsOptional()
  pricing: PricingData;

  @ApiProperty({
    description: 'Equipments Required',
    example: 'Bring your own towels',
  })
  @IsString()
  @IsOptional()
  equipmentsRequired: string;

  @ApiProperty({
    description: 'Instructor ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  instructor: number;

  @ApiProperty({
    description: 'Session Schedule',
    type: () => UpdateSessionScheduleDto,
  })
  @Type(() => UpdateSessionScheduleDto)
  @ValidateNested()
  @IsNotEmptyObject()
  @IsOptional()
  sessionSchedule: UpdateSessionScheduleDto;
}

export class UpdateClassSuccessResponseDto extends BaseResponseDto {
  @ApiProperty({
    type: () => [UpdateClassDataDto],
  })
  data: [UpdateClassDataDto];
}

export class ClassListRequestParamsDto extends BaseListDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    example: `${BaseUtils.getEnumKeys(ClassStatus).join('/')}`,
  })
  @IsOptional()
  @IsIn(BaseUtils.getEnumKeys(ClassStatus), {
    message: `Status can only be ${BaseUtils.getEnumKeys(ClassStatus)}`,
  })
  status?: string;

  @ApiProperty({
    required: false,
    example: '18:00',
  })
  @IsOptional()
  startTime: string;

  @ApiProperty({
    required: false,
    example: '19:00',
  })
  @IsOptional()
  endTime: string;

  @ApiProperty({
    required: false,
    example: [1, 2],
  })
  @IsOptional()
  categoryIds: [number];

  @ApiProperty({
    required: false,
    example: '2022-11-11',
  })
  @IsOptional()
  startDate: string;

  @ApiProperty({
    required: false,
    example: '2022-12-11',
  })
  @IsOptional()
  endDate: string;

  @ApiProperty({
    required: false,
    example: [1, 2],
  })
  @IsOptional()
  trainerIds: [number];

  @ApiProperty({
    required: false,
    example: 'Beginner',
  })
  @IsOptional()
  difficulty: string;

  @ApiProperty({
    required: false,
    example: 100,
  })
  @IsOptional()
  priceMin: number;

  @ApiProperty({
    required: false,
    example: 150,
  })
  @IsOptional()
  priceMax: number;

  @ApiProperty({
    required: false,
    example: 150,
  })
  @IsOptional()
  slotsMin: number;

  @ApiProperty({
    required: false,
    example: 250,
  })
  @IsOptional()
  slotsMax: number;
}
export class ClassListSortRequestParamsDto extends BaseListSortDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    example: '18:00',
  })
  @IsOptional()
  startTime: string;

  @ApiProperty({
    required: false,
    example: '19:00',
  })
  @IsOptional()
  endTime: string;

  @ApiProperty({
    required: false,
    example: [1, 2],
  })
  @IsOptional()
  categoryIds: [number];

  @ApiProperty({
    required: false,
    example: '2022-11-11',
  })
  @IsOptional()
  startDate: string;

  @ApiProperty({
    required: false,
    example: '2022-12-11',
  })
  @IsOptional()
  endDate: string;

  @ApiProperty({
    required: false,
    example: [1, 2],
  })
  @IsOptional()
  trainerIds: [number];

  @ApiProperty({
    required: false,
    example: 'Beginner',
  })
  @IsOptional()
  difficulty: string;

  @ApiProperty({
    required: false,
    example: 100,
  })
  @IsOptional()
  priceMin: number;

  @ApiProperty({
    required: false,
    example: 150,
  })
  @IsOptional()
  priceMax: number;

  @ApiProperty({
    required: false,
    example: 150,
  })
  @IsOptional()
  slotsMin: number;

  @ApiProperty({
    required: false,
    example: 250,
  })
  @IsOptional()
  slotsMax: number;
}

export class FavouritesListDto extends BaseListDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  name?: string;
}

export class FavouriteClassDto {
  @ApiProperty({
    example: 1,
  })
  class_id: number;

  @ApiProperty({
    example: 'Yoga',
  })
  class_name: string;

  @ApiProperty({
    example: 'Experienced',
  })
  class_difficulty: string;

  @ApiProperty({
    example: '2012-11-10T18:30:00.000Z',
  })
  sessionSchedule_start_date: string;

  @ApiProperty({
    example: '18:30:00',
  })
  sessionSchedule_start_time: string;

  @ApiProperty({
    example: 'John',
  })
  instructor_name: string;

  @ApiProperty({
    example: 'string',
  })
  photo_thumbnail: string;

  @ApiProperty({
    example: {
      hours: 1,
    },
  })
  duration: object;
}

class FavPaginated {
  @ApiProperty({
    type: () => [FavouriteClassDto],
  })
  classes: [FavouriteClassDto];

  @ApiProperty({
    example: 1,
  })
  count: number;
}
export class FavouritesListResponseDto extends BaseResponseDto {
  @ApiProperty()
  data: FavPaginated;
}
