import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { FitnessCategory } from './fitness.category.entity';
import { FitnessSubCategory } from './fitness.subcategory.entity';
import { BaseModel } from 'src/utils/base.model';

@Entity('user_fitness_categories')
@Unique('user_category_subcategory_unique_constraint', [
  'userId',
  'categoryId',
  'subCategoryId',
])
export class UserCategorySubCategory extends BaseModel {
  @ApiProperty({
    example: '1',
  })
  @PrimaryGeneratedColumn()
  public id: bigint;

  @ApiProperty({
    description: 'UUID',
    example: '1',
  })
  @Column()
  @Generated('uuid')
  uuid: string;

  @ApiProperty({
    description: 'User Id',
    example: 1,
  })
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.userCategorySubcategories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({
    description: 'Category Id',
    example: 1,
  })
  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => FitnessCategory, (fc) => fc.userCategorySubcategories)
  @JoinColumn({ name: 'category_id' })
  category: FitnessCategory;

  @ApiProperty({
    description: 'Subcategory Id',
    example: 2,
  })
  @Column({ name: 'subcategory_id', nullable: true })
  subCategoryId: number;

  @ManyToOne(() => FitnessSubCategory, (fsc) => fsc.userCategorySubcategories)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: FitnessSubCategory;
}
