import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponseDto } from '../../utils/base.response.dto';
import { FitnessSubCategoryService } from './fitness.subcategory.service';
import { FitnessSubCategoryDto } from './dto/fitness-subcategory.dto';

@ApiTags('FitnessCategory')
@ApiBearerAuth()
@Controller('fitnessSubCategory')
export class FitnessSubCategoryController {
  constructor(
    private readonly fitnessSubCategoryService: FitnessSubCategoryService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: BaseResponseDto,
  })
  async create(@Body() body: FitnessSubCategoryDto) {
    return await this.fitnessSubCategoryService.createFitnessSubCategory(body);
  }

  @Get('/fitness-subcategories')
  async findAll() {
    return await this.fitnessSubCategoryService.getAllSubCategory();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.fitnessSubCategoryService.getAllFitnessSubCategoryById(
      id,
    );
  }
}
