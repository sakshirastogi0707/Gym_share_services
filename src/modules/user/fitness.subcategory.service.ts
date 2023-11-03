import {
  NotFoundException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { FitnessSubCategoryDto } from './dto/fitness-subcategory.dto';
import { FitnessCategory } from './entity/fitness.category.entity';
import { User } from './entity/user.entity';
import { FitnessSubCategory } from './entity/fitness.subcategory.entity';
import { UserCategorySubCategory } from './entity/user.category.subcategory.entity';

@Injectable()
export class FitnessSubCategoryService {
  constructor(
    @InjectRepository(User)
    private userService: UserService,
    @InjectRepository(FitnessCategory)
    private fitnessCategoryRepository: Repository<FitnessCategory>,
    @InjectRepository(FitnessSubCategory)
    private fitnessSubCategoryRepository: Repository<FitnessSubCategory>,
    @InjectRepository(UserCategorySubCategory)
    private userCategorySubCategoryRepository: Repository<UserCategorySubCategory>,
  ) {}

  async createFitnessSubCategory(body: FitnessSubCategoryDto) {
    const model = {
      fitnessSubCategoryName: body.name,
      fitnessSubCategoryDescription: body.description,
      fitnessSubCategoryOrderId: body.orderId,
      isActive: body.isActive,
    };
    const fitnessSubCategoryEntity =
      this.fitnessCategoryRepository.create(model);
    await this.fitnessCategoryRepository.save(fitnessSubCategoryEntity);
    return {
      status: true,
      message: 'Fitness SubCategory created successfully',
      data: fitnessSubCategoryEntity,
    };
  }

  async getAllSubCategory() {
    const subAllCategory = await this.fitnessSubCategoryRepository.find({
      where: {
        isActive: true,
      },
      order: {
        orderId: 'ASC',
        name: 'ASC',
      },
    });

    if (subAllCategory !== null) {
      return {
        status: true,
        message: 'Fitness Subcategories List loaded successfully.',
        data: subAllCategory,
      };
    }
    throw new NotFoundException({
      status: false,
      message: 'Fitness subcategory not found',
    });
  }

  async getAllFitnessSubCategoryById(id: number) {
    const subCategoryFitness = await this.fitnessSubCategoryRepository.find({
      where: {
        category: id,
        isActive: true,
      },
      order: {
        orderId: 'ASC',
        name: 'ASC',
      },
    });
    if (subCategoryFitness) {
      return {
        status: true,
        message: 'Fitness subcategories list loaded successfully.',
        data: subCategoryFitness,
      };
    } else {
      return {
        status: false,
        message: 'Fitness subcategories not found',
        data: [],
      };
    }
  }

  async updateAllFitnessSubCategoryById(id: number) {
    const updatedCategories = await this.userCategorySubCategoryRepository
      .manager.query(`
      select pc.user_id "Intermediate User Id", pc.category_id "Intermediate Category Id", pc.subcategory_id "Intermediate SubCategory Id" 
      from users u 
      inner join user_fitness_categories pc on pc.user_id = u.id 
      inner join fitness_subcategory fsc on pc.subcategory_id = fsc.id
      where fsc.id = ${id}`);
    if (updatedCategories) {
      return {
        status: true,
        message: 'Subcategories updated successfully.',
        data: updatedCategories,
      };
    }
    throw new HttpException(
      'Updated Subcategory not found',
      HttpStatus.NOT_FOUND,
    );
  }
}
