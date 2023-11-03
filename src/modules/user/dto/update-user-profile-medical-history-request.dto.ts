import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserProfileMedicalHistoryRequestDto {
  @ApiProperty({
    description: 'Medical History',
    example: ['Sugar', 'Pain', 'Fever', 'Etc.'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  medicalHistory: string[];
}
