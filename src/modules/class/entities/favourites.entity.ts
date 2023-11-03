import { BaseModel } from 'src/utils/base.model';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Class } from 'src/modules/class/entities/class.entity';

@Entity('favourites')
export class Favourites extends BaseModel {
  @ManyToOne(() => User, (us) => us.favourites)
  user: User;

  @OneToOne(() => Class)
  @JoinColumn()
  class: Class;
}
