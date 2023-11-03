import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FitnessCategoryService } from './fitness.category.service';
import { FitnessCategoryDto } from './dto/fitness-category.dto';
import { FitnessCategory } from './entity/fitness.category.entity';

@ApiTags('FitnessCategory')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('fitness')
export class FitnessCategoryController {
  constructor(private fitnessCategoryService: FitnessCategoryService) {}

  @Post('/create-category')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: FitnessCategory,
  })
  async create(@Body() body: FitnessCategoryDto) {
    const result = await this.fitnessCategoryService.createFitnessCategory(
      body,
    );
    return {
      status: true,
      message: 'Fitness category created successfully.',
      data: result,
    };
  }

  @Get('/fitness-category')
  @ApiOkResponse({
    type: FitnessCategory,
  })
  async getAll() {
    return await this.fitnessCategoryService.getAllPreferredFitnessCategories();
  }

  @Get(':id')
  @ApiOkResponse({
    type: FitnessCategory,
  })
  async findOne(@Param('id') id: number) {
    return await this.fitnessCategoryService.getFitnessCategoryById(+id);
  }
}
