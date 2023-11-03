import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  BaseInternalServerErrorReponse,
  BaseNotFoundErrorReponse,
} from 'src/utils/base.response.dto';
import { AmenityService } from './amenity.service';
import { AmentiesResponseDto } from './dto/amenities-data.dto';

@ApiTags('Amenity')
@ApiBearerAuth()
@Controller('amenities')
@ApiNotFoundResponse({
  type: BaseNotFoundErrorReponse,
})
@ApiInternalServerErrorResponse({
  type: BaseInternalServerErrorReponse,
})
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Get('/')
  @ApiOkResponse({
    type: AmentiesResponseDto,
  })
  async findAll() {
    const amenities = await this.amenityService.getAllAmenities();
    return {
      status: true,
      message: 'Amenities List loaded successfully.',
      data: amenities,
    };
  }
}
