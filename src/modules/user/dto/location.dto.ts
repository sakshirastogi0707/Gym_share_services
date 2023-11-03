import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class LocationDto {
  @ApiProperty({
    description: 'Location longititude',
    example: '28.6466735',
  })
  @IsNumber()
  @IsLongitude()
  @IsNotEmpty()
  public lng: number;

  @ApiProperty({
    description: 'Location latitude',
    example: '28.6466735',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  @IsLatitude()
  public lat: number;

  @ApiProperty({
    description: 'Location city name',
    example: 'CA',
  })
  @IsString()
  @IsNotEmpty()
  public city: string;

  @ApiProperty({
    description: 'Location state name',
    example: 'California',
  })
  @IsString()
  @IsNotEmpty()
  public state: string;

  @ApiProperty({
    description: 'Location pincode',
    example: '234-111-223',
  })
  @IsString()
  @IsNotEmpty()
  public pinCode: string;

  @ApiProperty({
    description: 'Location country name',
    example: 'USA',
  })
  @IsString()
  @IsNotEmpty()
  public country: string | undefined;
}
