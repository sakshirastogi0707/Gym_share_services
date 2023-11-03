import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FitnessCategory } from './entity/fitness.category.entity';
import { UserService } from './user.service';
import { FitnessCategoryDto } from './dto/fitness-category.dto';
import { User } from './entity/user.entity';
import { UserCategorySubCategory } from './entity/user.category.subcategory.entity';

@Injectable()
export class FitnessCategoryService {
  constructor(
    @InjectRepository(User)
    private userService: UserService,
    @InjectRepository(FitnessCategory)
    private fitnessCategoryRepository: Repository<FitnessCategory>,
    @InjectRepository(UserCategorySubCategory)
    private userCategorySubCategoryRepository: Repository<UserCategorySubCategory>,
  ) {}

  async createFitnessCategory(body: FitnessCategoryDto) {
    const model = {
      name: body.name,
      description: body.description,
      icon: body.icon,
      fitnessCaorderIdtegoryOrderId: body.orderId,
      isActive: body.isActive,
    };
    const fitnessCategoryEntity = this.fitnessCategoryRepository.create(model);
    return await this.fitnessCategoryRepository.save(fitnessCategoryEntity);
  }

  async getFitnessCategoryById(id: number) {
    const categories = await this.fitnessCategoryRepository.manager
      .query(`select u.id "UserId", fc.id "CategoryId", fc.name "CategoryName", 
      fc.description "CategoryDescription", fc.icon "CategoryIcon", fc.order_id "Order Id", 
      fc.active "Active" 
      from users u
      inner join user_fitness_categories pc on pc.user_id = u.id 
      inner join fitness_category fc on pc.category_id = fc.id 
      where pc.category_id=${id}
      `);
    if (categories) {
      return {
        status: true,
        message: 'Fitness categories list loaded successfully.',
        data: categories,
      };
    }
    throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
  }

  async updateFitnessCategoryById(id: number): Promise<FitnessCategory> {
    const categories = await this.fitnessCategoryRepository.findOne(+id);
    if (categories) {
      return categories[0];
    }
    throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const category = await this.fitnessCategoryRepository.manager
      .query(`select pc.user_id "User Id", pc.category_id "Category Id", pc.subcategory_id "SubCategory Id" 
    from users u
    inner join user_fitness_categories pc on pc.user_id = u.id 
    inner join fitness_category fc on pc.category_id = fc.id 
    where pc.category_id=${id}
    `);
    if (category) {
      return category[0];
    }
    throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
  }

  async getAllPreferredFitnessCategories() {
    const categoryFitness = await this.fitnessCategoryRepository.find({
      select: ['id', 'name', 'description', 'icon', 'orderId', 'isActive'],
      where: {
        isActive: true,
      },
      order: {
        orderId: 'ASC',
        name: 'ASC',
      },
    });

    if (categoryFitness) {
      return {
        status: true,
        message: 'Fitness categories list loaded successfully.',
        data: categoryFitness,
      };
    } else {
      return {
        status: false,
        message: 'Fitness categories not found',
        data: [],
      };
    }
  }
}
