import { BaseModel } from 'src/utils/base.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Instructor } from './instructor.entity';

@Entity('certificates')
export class Certificate extends BaseModel {
  @ApiProperty({
    description: 'Display Order ID',
    example: 1,
  })
  @Column({ name: 'order_id' })
  orderId: number;

  @ApiProperty({
    description: 'Name',
    example: 'Advance Yoga Certificate',
  })
  @Column({ name: 'name', length: 50 })
  name: string;

  @ApiProperty({
    description: 'PDF File',
    example: 'certificate.pdf',
  })
  @Column({ name: 'pdf_file' })
  pdfFile: string;

  @ApiProperty({
    description: 'List of all active certificates',
    example: 'True or False',
  })
  @Column({ name: 'active', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Instructor, (instructor) => instructor.certificates)
  instructor: Instructor;
}
