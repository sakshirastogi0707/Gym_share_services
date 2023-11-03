import { BaseModel } from 'src/utils/base.model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Class } from './class.entity';

@Entity('sessions')
export class Session extends BaseModel {
  @Column({ name: 'on_date', type: 'date', nullable: true })
  onDate: Date;

  @Column({ name: 'start_time', type: 'time', nullable: true })
  startTime: string;

  @Column({ name: 'end_time', type: 'time', nullable: true })
  endTime: string;

  @Column({ name: 'total_seats', default: 0 })
  totalSeats: number;

  @Column({ name: 'seats_filled', default: 0 })
  seatsFilled: number;

  @Column({ name: 'active', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Class, (classObj) => classObj.sessions)
  @JoinColumn({ name: 'class_id' })
  class: Class;
}
