import { ApiProperty } from '@nestjs/swagger';

export class Certificate {
  @ApiProperty({
    name: 'name',
  })
  name: string;

  @ApiProperty({
    name: 'pdfFile',
  })
  pdfFile: string;
}
