import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class AddOnsDataModel {
  @ApiProperty({
    description: 'Name',
    example: 'Yoga Mat',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Price',
    example: 100,
  })
  @IsNumber()
  price: number;
}
