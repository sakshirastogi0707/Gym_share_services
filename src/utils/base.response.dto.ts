import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiProperty({
    description: 'status',
    example: true,
  })
  status: boolean;

  @ApiProperty({
    description: 'message',
    example: 'success',
  })
  message: string;
}

export class BaseInternalServerErrorReponse {
  @ApiProperty({
    example: 500,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Internal server error',
  })
  message: string;
}

export class BaseBadRequestErrorReponse {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Bad Request!!',
  })
  message: string;
}

export class BaseNotFoundErrorReponse {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Not Found',
  })
  message: string;
}
