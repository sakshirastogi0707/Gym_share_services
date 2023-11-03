import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import {
  CreateInstructorDto,
  CreateInstructorSuccessDto,
  GetAllInstructorResponseSuccessDto,
  UpdateInstructorDto,
  UpdateInstructorResponseSuccessDto,
} from './dto/create-instructor.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BaseInternalServerErrorReponse,
  BaseNotFoundErrorReponse,
  BaseResponseDto,
} from 'src/utils/base.response.dto';

@ApiTags('Instructor')
@ApiBearerAuth()
@ApiNotFoundResponse({
  type: BaseNotFoundErrorReponse,
})
@ApiInternalServerErrorResponse({
  type: BaseInternalServerErrorReponse,
})
@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateInstructorSuccessDto,
  })
  async create(@Body() createInstructorDto: CreateInstructorDto) {
    return await this.instructorService.create(createInstructorDto);
  }

  @Get()
  @ApiOkResponse({
    type: GetAllInstructorResponseSuccessDto,
  })
  async findAll() {
    return await this.instructorService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreateInstructorSuccessDto,
  })
  async findOne(@Param('id') id: string) {
    return await this.instructorService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    type: UpdateInstructorResponseSuccessDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    if (Object.keys(updateInstructorDto).length === 0) {
      throw new BadRequestException('Please provide the value to be updated!');
    }
    return await this.instructorService.update(id, updateInstructorDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: BaseResponseDto,
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.instructorService.remove(id);
  }
}
