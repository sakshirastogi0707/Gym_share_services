import { BaseModel } from 'src/utils/base.model';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Gym } from './gym.entity';

@Entity('amenities')
export class Amenity extends BaseModel {
  @Column({ name: 'order_id', nullable: false })
  orderId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'active', type: 'boolean' })
  isActive: boolean;

  @ManyToMany(() => Gym, (gym) => gym.amenities)
  gyms: Gym[];

  @Column({ nullable: true })
  image: string;
}
