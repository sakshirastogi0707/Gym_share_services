import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';

export class InstructorDataDto {
  @ApiProperty({
    name: 'name',
  })
  name: string;
  @ApiProperty({
    name: 'photo',
  })
  photo: string;
  @ApiProperty({
    name: 'dob',
  })
  dob: string;
  @ApiProperty({
    name: 'about',
  })
  about: string;
  @ApiProperty({
    name: 'exp_years',
  })
  exp_years: number;
  @ApiProperty({
    name: 'exp_months',
  })
  exp_months: number;
  @ApiProperty({
    name: 'active',
  })
  active: boolean;
  @ApiProperty({
    name: 'gymId',
  })
  gymId: number;
}

export class InstructorDetailsReponse extends BaseResponseDto {
  @ApiProperty()
  data: InstructorDataDto;
}
