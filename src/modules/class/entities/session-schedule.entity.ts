import { BaseModel } from 'src/utils/base.model';
import { Column, Entity, OneToOne } from 'typeorm';
import { Class } from './class.entity';
import { CustomRepeatTransformer } from 'src/utils/transformer/custom-repeat.tranformer';
import { ClassRepeat } from 'src/enums/class.enum';
import { EnumTransformer } from 'src/utils/transformer/enum.transformer.utils';

@Entity('session_schedule')
export class SessionSchedule extends BaseModel {
  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @Column({ name: 'start_time', type: 'time', nullable: true })
  startTime: string;

  @Column({ name: 'end_time', type: 'time', nullable: true })
  endTime: string;

  @Column({ nullable: true })
  occurences: number;

  @Column({
    type: 'integer',
    transformer: new EnumTransformer(ClassRepeat),
    nullable: true,
  })
  repeat: string;

  @Column({
    name: 'custom_details',
    type: 'jsonb',
    transformer: new CustomRepeatTransformer(),
  })
  customDetails: any;

  @OneToOne(() => Class, (gymClass) => gymClass.sessionSchedule)
  class: Class;
}
