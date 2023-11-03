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
import { FitnessCategory } from '../../user/entity/fitness.category.entity';
import { FitnessSubCategory } from '../../user/entity/fitness.subcategory.entity';
import { BaseModel } from 'src/utils/base.model';
import { Gym } from './gym.entity';

@Entity('gym_categories_subcategories')
@Unique('gym_category_subcategory_unique_constraint', [
  'gymId',
  'categoryId',
  'subCategoryId',
])
export class GymCategorySubCategory extends BaseModel {
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
    description: 'Gym Id',
    example: 1,
  })
  @Column({ name: 'gym_id' })
  gymId: number;

  @ManyToOne(() => Gym, (gym) => gym.gymCategorySubcategories)
  @JoinColumn({ name: 'gym_id' })
  gym: Gym;

  @ApiProperty({
    description: 'Category Id',
    example: 1,
  })
  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => FitnessCategory, (fc) => fc.gymCategorySubcategories)
  @JoinColumn({ name: 'category_id' })
  category: FitnessCategory;

  @ApiProperty({
    description: 'Subcategory Id',
    example: 2,
  })
  @Column({ name: 'subcategory_id', nullable: true })
  subCategoryId: number;

  @ManyToOne(() => FitnessSubCategory, (fsc) => fsc.gymCategorySubcategories)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: FitnessSubCategory;
}
