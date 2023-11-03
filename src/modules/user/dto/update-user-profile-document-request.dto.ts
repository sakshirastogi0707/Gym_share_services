import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateUserProfileDocumentRequestDto {
  @ApiProperty()
  @IsArray()
  @IsOptional()
  public documentCertificate: [string];
}
