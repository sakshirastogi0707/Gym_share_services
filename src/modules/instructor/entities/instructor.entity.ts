import { BaseModel } from 'src/utils/base.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { InstructorTrainedFor } from './trained_for.entity';
import { Certificate } from './certificate.entity';
import { Gym } from 'src/modules/gym/entities/gym.entity';
import { Class } from 'src/modules/class/entities/class.entity';
@Entity('instructors')
export class Instructor extends BaseModel {
  @ApiProperty({
    description: 'Name',
    example: 'Joan Kelly',
  })
  @Column({ name: 'name', length: 50 })
  name: string;

  @ApiProperty({
    description: 'Photo',
    example: 'pic://picture',
  })
  @Column({ name: 'photo' })
  photo: string;

  @ApiProperty({
    description: 'Date of Birth',
    example: '1994-04-15',
  })
  @Column({ name: 'dob', type: 'date' })
  dob: Date;

  @ApiProperty({
    description: 'About',
    example: 'A world-class coach dedicated to your success.',
  })
  @Column({ name: 'about', length: 100 })
  about: string;

  @ApiProperty({
    description: 'Experience years',
    example: 5,
  })
  @Column({ name: 'exp_years' })
  expYears: number;

  @ApiProperty({
    description: 'Experience months',
    example: 10,
  })
  @Column({ name: 'exp_months' })
  expMonths: number;

  @ManyToOne(() => Gym, (gym) => gym.instructors)
  gym: Gym;

  @OneToMany(() => InstructorTrainedFor, (itf) => itf.instructor)
  trainedFor: InstructorTrainedFor[];

  @OneToMany(() => Certificate, (certificate) => certificate.instructor)
  @JoinColumn({ name: 'instructor' })
  certificates: Certificate[];

  @ManyToMany(() => Class, (cls) => cls.instructor)
  classes: Class[];

  @ApiProperty({
    description: 'List of all active instructors',
    example: 'True or False',
  })
  @Column({ name: 'active', type: 'boolean', default: true })
  active: boolean;
}
