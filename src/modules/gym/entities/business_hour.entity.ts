import { BaseModel } from 'src/utils/base.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Gym } from './gym.entity';
@Entity('business_hours')
export class Business_Hour extends BaseModel {
  @Column({ name: 'day' })
  day: number;

  @Column({ name: 'open_time', type: 'time' })
  open_time: string;

  @Column({ name: 'close_time', type: 'time' })
  close_time: string;

  @Column({ name: 'open24Hour', default: false })
  open24Hour: boolean;

  @ManyToOne(() => Gym, (gym) => gym.businessHours)
  gym: Gym;

  @Column()
  gymId: number;
}
