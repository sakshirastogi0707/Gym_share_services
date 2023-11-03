import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/utils/base.model';
import { UserCategorySubCategory } from './user.category.subcategory.entity';
import { FitnessCategory } from './fitness.category.entity';
import { GymCategorySubCategory } from 'src/modules/gym/entities/gym.category.subcategory.entity';
import { InstructorTrainedFor } from 'src/modules/instructor/entities/trained_for.entity';
import { ClassCategorySubcategory } from 'src/modules/class/entities/class-category-subcategory.entity';
@Entity('fitness_subcategory')
export class FitnessSubCategory extends BaseModel {
  @ApiProperty({
    description: 'List of all the fitness subcategories',
    example: 'Yoga and HIIT',
  })
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @ApiProperty({
    description: 'List of all the fitness subcategories description',
    example: 'Yoga HIIT',
  })
  @Column({ name: 'description', length: 200, nullable: false })
  description: string;

  @ApiProperty({
    description: 'Ordering of the selected categories on order id',
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

  @ManyToOne(() => FitnessCategory, (fc) => fc.subcategory)
  category: FitnessCategory;

  @OneToMany(() => UserCategorySubCategory, (ucs) => ucs.subcategory)
  userCategorySubcategories: UserCategorySubCategory[];

  @OneToMany(() => ClassCategorySubcategory, (ccs) => ccs.subcategory)
  classCategorySubcategories: ClassCategorySubcategory[];

  @OneToMany(() => GymCategorySubCategory, (gcs) => gcs.subcategory)
  gymCategorySubcategories: GymCategorySubCategory[];

  @OneToMany(() => InstructorTrainedFor, (itf) => itf.category)
  trainedForSubcategories: InstructorTrainedFor[];
}
