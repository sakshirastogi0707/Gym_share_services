import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class BaseModel extends BaseEntity {
  @ApiProperty({
    example: '1',
  })
  @PrimaryGeneratedColumn()
  public id: bigint;

  @ApiProperty({
    example: '2023-01-20T21:43:09Z',
  })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public createdAt: Date;

  @ApiProperty({
    example: '2023-01-20T21:43:09Z',
  })
  @Column({ type: 'timestamptz', name: 'modified_at', nullable: true })
  public modifiedAt: Date;
}
