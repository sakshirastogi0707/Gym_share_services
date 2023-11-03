import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Instructor } from './instructor.entity';
import { FitnessSubCategory } from '../../user/entity/fitness.subcategory.entity';
import { BaseModel } from 'src/utils/base.model';
import { FitnessCategory } from 'src/modules/user/entity/fitness.category.entity';

@Entity('instructor_trained_for')
@Unique('instructor_trained_for_unique_constraint', [
  'instructorId',
  'categoryId',
  'subCategoryId',
])
export class InstructorTrainedFor extends BaseModel {
  @ApiProperty({
    example: '1',
  })
  @PrimaryGeneratedColumn()
  public id: bigint;

  @ApiProperty({
    description: 'Instructor Id',
    example: 1,
  })
  @Column({ name: 'instructor_id' })
  instructorId: number;

  @ManyToOne(() => Instructor, (instructor) => instructor.trainedFor)
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;

  @ApiProperty({
    description: 'Category Id',
    example: 1,
  })
  @Column({ name: 'category_id' })
  categoryId: number;

  @ApiProperty({
    description: 'Subcategory Id',
    example: 2,
  })
  @Column({ name: 'subcategory_id', nullable: true })
  subCategoryId: number;

  @ManyToOne(() => FitnessSubCategory, (fsc) => fsc.trainedForSubcategories)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: FitnessSubCategory;

  @ManyToOne(() => FitnessCategory, (fsc) => fsc.trainedForCategory)
  @JoinColumn({ name: 'category_id' })
  category: FitnessCategory;
}
