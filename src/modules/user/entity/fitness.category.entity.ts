import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/utils/base.model';
import { UserCategorySubCategory } from './user.category.subcategory.entity';
import { FitnessSubCategory } from './fitness.subcategory.entity';
import { GymCategorySubCategory } from 'src/modules/gym/entities/gym.category.subcategory.entity';
import { InstructorTrainedFor } from 'src/modules/instructor/entities/trained_for.entity';
import { ClassCategorySubcategory } from 'src/modules/class/entities/class-category-subcategory.entity';

@Entity('fitness_category')
export class FitnessCategory extends BaseModel {
  @ApiProperty({
    description: 'List of all the fitness categories',
    example: 'Yoga and HIIT',
  })
  @Column({ name: 'name', length: 100, nullable: true })
  name: string;

  @ApiProperty({
    description: 'All Fitness categories description',
    example: 'Yoga and HIIT',
  })
  @Column({ name: 'description', length: 200, nullable: true })
  description: string;

  @ApiProperty({
    description: 'Category Icon',
    example: 'Yoga and HIIT',
  })
  @Column({ name: 'icon', nullable: true })
  icon: string;

  @ApiProperty({
    description: 'Choice of the selection of categories of fitness choices',
    example: 'Cycling and Acrobatics',
  })
  @Column({ name: 'order_id', nullable: false })
  orderId: number;

  @ApiProperty({
    description: 'List of all the fitness available categories status ',
    example: 'True or False',
  })
  @Column({ name: 'active', type: 'boolean' })
  isActive: boolean;

  @OneToMany(() => FitnessSubCategory, (fsc) => fsc.category)
  subcategory: FitnessSubCategory[];

  @OneToMany(() => UserCategorySubCategory, (ucs) => ucs.category)
  userCategorySubcategories: UserCategorySubCategory[];

  @OneToMany(() => ClassCategorySubcategory, (ccs) => ccs.category)
  classCategorySubcategories: ClassCategorySubcategory[];

  @OneToMany(() => GymCategorySubCategory, (gcs) => gcs.category)
  gymCategorySubcategories: GymCategorySubCategory[];

  @OneToMany(() => InstructorTrainedFor, (itf) => itf.category)
  trainedForCategory: InstructorTrainedFor[];
}
