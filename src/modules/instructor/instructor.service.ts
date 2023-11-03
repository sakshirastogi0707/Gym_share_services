import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateInstructorDto,
  UpdateInstructorDto,
} from './dto/create-instructor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { InstructorTrainedFor } from './entities/trained_for.entity';
import { Gym } from '../gym/entities/gym.entity';
import { BaseModel } from 'src/utils/base.model';
import { serializeCategories } from 'src/utils/transformUserData.utils';
import { FitnessSubCategory } from '../user/entity/fitness.subcategory.entity';
import { FitnessCategory } from '../user/entity/fitness.category.entity';
@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
    @InjectRepository(InstructorTrainedFor)
    private tarinedForRepository: Repository<InstructorTrainedFor>,
    @InjectRepository(Gym)
    private gymRepository: Repository<Gym>,
    @InjectRepository(FitnessCategory)
    private categoryRepo: Repository<FitnessCategory>,
    @InjectRepository(FitnessSubCategory)
    private subcategoryRepo: Repository<FitnessSubCategory>,
  ) {}

  async create(createInstructorDto: CreateInstructorDto) {
    const { gymId } = createInstructorDto;
    const gym = await this.gymRepository.findOne({
      where: { id: gymId },
      relations: ['instructors'],
    });

    if (!gym) {
      throw new NotFoundException('Gym not found!');
    }
    await this.validateInstructorCategory(createInstructorDto);
    try {
      const instructors: any = this.instructorRepository.create();
      instructors.name = createInstructorDto.name ?? null;
      instructors.photo = createInstructorDto.photo ?? null;
      instructors.about = createInstructorDto.about ?? null;
      instructors.expYears = createInstructorDto.expYears ?? null;
      instructors.expMonths = createInstructorDto.expMonths ?? null;
      instructors.dob = createInstructorDto.dob ?? null;
      instructors.gym = gym;
      const savedInstructor = await this.instructorRepository.save(instructors);

      const certificates = createInstructorDto.certificates.map(
        (certificate, index) => {
          const certificateModel = new Certificate();
          certificateModel.orderId = index + 1;
          certificateModel.name = certificate.name;
          certificateModel.pdfFile = certificate.pdfFile;
          certificateModel.instructor = savedInstructor.id;
          return certificateModel;
        },
      );
      await this.certificateRepository.save(certificates);

      const instructorTrainedForObjs = [];
      for (const trainedFor of createInstructorDto.trainedFor) {
        if (trainedFor.subCategoryIds.length > 0) {
          for (const subCategoryId of trainedFor.subCategoryIds) {
            const trainedForModel = new InstructorTrainedFor();
            trainedForModel.instructorId = savedInstructor.id;
            trainedForModel.categoryId = trainedFor.categoryId;
            trainedForModel.subCategoryId = subCategoryId;
            instructorTrainedForObjs.push(trainedForModel);
          }
        } else {
          const trainedForModel = new InstructorTrainedFor();
          trainedForModel.instructorId = savedInstructor.id;
          trainedForModel.categoryId = trainedFor.categoryId;
          instructorTrainedForObjs.push(trainedForModel);
        }
      }

      let trainedFor = await this.tarinedForRepository.save(
        instructorTrainedForObjs,
      );

      trainedFor = await this.tarinedForRepository.find({
        where: { instructorId: savedInstructor.id },
        relations: ['category', 'subcategory'],
      });
      trainedFor = serializeCategories(trainedFor);
      const data = { ...createInstructorDto, trainedFor };
      return {
        status: true,
        message: 'Instructor added successfully',
        data,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      if (error.code && error.code == 23503) {
        throw new BadRequestException(`Incorrect category or subcategory!`);
      }
      throw new InternalServerErrorException('something went wrong');
    }
  }

  async validateInstructorCategory(createInstructorDto: CreateInstructorDto) {
    for (const trainedFor of createInstructorDto.trainedFor) {
      if (trainedFor.subCategoryIds.length > 0) {
        for (const subCategoryId of trainedFor.subCategoryIds) {
          const subCategoryData = await this.subcategoryRepo.findOne({
            where: {
              id: subCategoryId,
              category: trainedFor.categoryId,
            },
            select: ['category', 'id', 'description'],
          });
          if (!subCategoryData) {
            throw new BadRequestException(
              'Fitness category and subcategories are not associated',
            );
          }
        }
      } else {
        const categoryData = await this.categoryRepo.findOne({
          where: {
            id: trainedFor.categoryId,
          },
        });
        if (!categoryData) {
          throw new BadRequestException('Fitness category not found!');
        }
      }
    }
  }

  findAll() {
    return this.instructorRepository.find({
      where: {
        active: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const instructorData: any = await this.instructorRepository
      .findOne({
        where: {
          id: id,
        },
        relations: ['certificates'],
      })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
    if (!instructorData) {
      return {
        status: false,
        message: 'Instructor not found',
      };
    } else {
      const trained_for = await this.tarinedForRepository.find({
        where: { instructorId: id },
        relations: ['category', 'subcategory'],
      });

      const data = {
        ...instructorData,
        trainedFor: serializeCategories(trained_for),
      };
      return {
        status: true,
        message: 'Instructor fatched successfully',
        data,
      };
    }
  }

  async update(id: number, updateInstructorDto: Partial<UpdateInstructorDto>) {
    const findInstructorRes = await this.instructorRepository.findOne({
      where: [{ id: id }],
    });

    if (!findInstructorRes) {
      throw new NotFoundException({
        status: false,
        message: 'Instructor not found',
      });
    }
    const updatedFields: Partial<UpdateInstructorDto & BaseModel> = {
      ...UpdateInstructorDto,
      modifiedAt: new Date(),
    };

    if (updateInstructorDto.name !== undefined) {
      updatedFields.name = updateInstructorDto.name;
    }
    if (updateInstructorDto.photo !== undefined) {
      updatedFields.photo = updateInstructorDto.photo;
    }
    if (updateInstructorDto.about !== undefined) {
      updatedFields.about = updateInstructorDto.about;
    }
    if (updateInstructorDto.expYears !== undefined) {
      updatedFields.expYears = updateInstructorDto.expYears;
    }
    if (updateInstructorDto.expMonths !== undefined) {
      updatedFields.expMonths = updateInstructorDto.expMonths;
    }
    if (updateInstructorDto.dob !== undefined) {
      updatedFields.dob = updateInstructorDto.dob;
    }

    if (updateInstructorDto.trainedFor !== undefined) {
      await this.tarinedForRepository.delete({ instructorId: id });
      const instructorTrainedForObjs = [];
      for (const trainedFor of updateInstructorDto.trainedFor) {
        if (trainedFor.subCategoryIds.length > 0) {
          for (const subCategoryId of trainedFor.subCategoryIds) {
            const trainedForModel = new InstructorTrainedFor();
            trainedForModel.instructorId = id;
            trainedForModel.categoryId = trainedFor.categoryId;
            trainedForModel.subCategoryId = subCategoryId;
            instructorTrainedForObjs.push(trainedForModel);
          }
        } else {
          const trainedForModel = new InstructorTrainedFor();
          trainedForModel.instructorId = id;
          trainedForModel.categoryId = trainedFor.categoryId;
          instructorTrainedForObjs.push(trainedForModel);
        }
      }

      await this.tarinedForRepository.save(instructorTrainedForObjs);
    }
    if (updateInstructorDto.certificates !== undefined) {
      await this.certificateRepository.delete({
        instructor: findInstructorRes,
      });
      const certificates = updateInstructorDto.certificates.map(
        (certificate, index) => {
          const certificateModel = new Certificate();
          certificateModel.orderId = index + 1;
          certificateModel.name = certificate.name;
          certificateModel.pdfFile = certificate.pdfFile;
          certificateModel.instructor = findInstructorRes;
          return certificateModel;
        },
      );
      await this.certificateRepository.save(certificates);
    }

    const updateInstructorRes = await this.instructorRepository.update(
      {
        id: findInstructorRes.id,
      },
      updatedFields,
    );

    const isUpdated = updateInstructorRes.hasOwnProperty('affected');
    if (!isUpdated || updateInstructorRes.affected === 0) {
      throw new ForbiddenException({
        status: true,
        message: 'Failed to update instructor profile',
      });
    }

    const updatedInstructor = await this.instructorRepository.findOne({
      where: [{ id: findInstructorRes.id }],
      relations: ['certificates'],
    });

    let trainedFor = await this.tarinedForRepository.find({
      where: { instructorId: id },
      relations: ['category', 'subcategory'],
    });
    trainedFor = serializeCategories(trainedFor);

    return {
      status: true,
      message: 'Instructor profile updated successfully',
      data: { ...updatedInstructor, trainedFor },
    };
  }

  async remove(id: number) {
    const instructor = await this.instructorRepository.findOne({
      where: [{ id: id }],
    });
    if (!instructor) {
      throw new NotFoundException({
        status: false,
        message: 'Instructor not found',
      });
    }
    const updatedData: any = await this.instructorRepository
      .update(
        { id: instructor.id },
        {
          active: false,
        },
      )
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
    if (updatedData.affected == 1) {
      return {
        status: true,
        message: 'Instructor removed successfully',
      };
    } else {
      return {
        status: false,
        message: 'Unable to remove instructor',
      };
    }
  }
}
