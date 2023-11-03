import { ApiProperty } from '@nestjs/swagger';

export class HealthModel {
  @ApiProperty({
    example: 'OK',
  })
  public status: string;

  @ApiProperty({
    example: '2023-05-04 21:43:09',
  })
  public time: string;
}
