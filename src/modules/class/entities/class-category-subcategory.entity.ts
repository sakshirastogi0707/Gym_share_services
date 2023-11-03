import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Class } from './class.entity';
import { FitnessCategory } from '../../user/entity/fitness.category.entity';
import { FitnessSubCategory } from '../../user/entity/fitness.subcategory.entity';
import { BaseModel } from 'src/utils/base.model';

@Entity('class_category_subcategory')
@Unique('class_category_subcategory_unique_constraint', [
  'class',
  'categoryId',
  'subCategoryId',
])
export class ClassCategorySubcategory extends BaseModel {
  @ApiProperty({
    example: '1',
  })
  @PrimaryGeneratedColumn()
  public id: bigint;

  @ApiProperty({
    description: 'Class',
    example: 1,
  })
  @ManyToOne(() => Class, (fc) => fc.classCategorySubcategories)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ApiProperty({
    description: 'Category Id',
    example: 1,
  })
  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => FitnessCategory, (fc) => fc.classCategorySubcategories)
  @JoinColumn({ name: 'category_id' })
  category: FitnessCategory;

  @ApiProperty({
    description: 'Subcategory Id',
    example: 2,
  })
  @Column({ name: 'subcategory_id', nullable: true })
  subCategoryId: number;

  @ManyToOne(() => FitnessSubCategory, (fsc) => fsc.classCategorySubcategories)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: FitnessSubCategory;
}
