import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Patch,
  UsePipes,
  Req,
  Query,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { ClassService } from './class.service';
import {
  ClassDto,
  ClassListRequestParamsDto,
  ClassListSortRequestParamsDto,
  CreateClassSuccessDto,
  FavouritesListDto,
  FavouritesListResponseDto,
  UpdateClassDataDto,
  UpdateClassSuccessResponseDto,
} from './dto/class.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { Request } from 'express';
import { InstructorDataDto } from '../gym/dto/instructor-data.dto';

@ApiTags('Class')
@Controller('class')
@ApiBearerAuth()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get('/favourites')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    type: FavouritesListResponseDto,
  })
  async getFavourites(@Query() query: FavouritesListDto, @Req() req: Request) {
    return await this.classService.getFavourites(req['user'].id, query);
  }

  @Post(':gymId')
  @ApiCreatedResponse({
    type: CreateClassSuccessDto,
  })
  async create(
    @Param('gymId') gymId: number,
    @Body() createClassDto: ClassDto,
  ) {
    return await this.classService.create(gymId, createClassDto);
  }

  @Get('/list/:gymId')
  @UsePipes()
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  list(
    @Query() query: ClassListRequestParamsDto,
    @Req() req: Request,
    @Param('gymId') gymId: string,
  ) {
    return this.classService.findAll(query, gymId);
  }

  @Get('/list-for-users')
  @UsePipes()
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  listForUsers(@Query() query: ClassListSortRequestParamsDto) {
    return this.classService.findClassForUsers(query);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  delete(@Param('id') id: number) {
    return this.classService.delete(id);
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreateClassSuccessDto,
  })
  async getClassDetailsById(@Param('id') classId: string) {
    return await this.classService.getClassDetailsById(classId);
  }

  @Patch(':gymId/:classId')
  @ApiCreatedResponse({
    type: UpdateClassSuccessResponseDto,
  })
  async updateClassDetailsById(
    @Param('gymId') gymId: string,
    @Param('classId') classId: string,
    @Body() updateClassDataDto: UpdateClassDataDto,
  ) {
    if (!updateClassDataDto || Object.keys(updateClassDataDto).length === 0) {
      throw new BadRequestException('Request body cannot be empty!');
    }
    return await this.classService.updateClassDetailsById(
      gymId,
      classId,
      updateClassDataDto,
    );
  }

  @Get('/class/:classId/instructors/:instructorId')
  @ApiOkResponse({
    type: InstructorDataDto,
  })
  async getGymInstructors(
    @Param('instructorId') instructorId: number,
    @Param('classId') classId: number,
  ) {
    return this.classService.instructorDetails(classId, instructorId);
  }

  @Post('/:classId/favourites')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  async addToFavourites(
    @Param('classId') classId: number,
    @Req() req: Request,
  ) {
    return await this.classService.addToFavourites(req['user'].id, classId);
  }

  @Delete('/:classId/favourites')
  @ApiOkResponse({
    type: BaseResponseDto,
  })
  async deleteFavourites(
    @Param('classId') classId: number,
    @Req() req: Request,
  ) {
    return await this.classService.removeFromFavourites(
      req['user'].id,
      classId,
    );
  }
}
