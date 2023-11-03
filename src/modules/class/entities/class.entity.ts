import { BaseModel } from 'src/utils/base.model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Gym } from 'src/modules/gym/entities/gym.entity';
import { AddOnsDataModel } from '../dto/add-ons-data.dto';
import { Instructor } from 'src/modules/instructor/entities/instructor.entity';
import { SessionSchedule } from './session-schedule.entity';
import { ClassCategorySubcategory } from './class-category-subcategory.entity';
import { ClassStatus, Difficulty } from 'src/enums/class.enum';
import { EnumTransformer } from 'src/utils/transformer/enum.transformer.utils';
import { PricingData } from '../dto/pricing.dto';
import { AboutClass } from '../dto/class.dto';
import { Session } from './session.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';

@Entity('classes')
export class Class extends BaseModel {
  @Column({ name: 'name', length: 50 })
  name: string;

  @Column({ name: 'spots', nullable: true })
  spots: number;

  @Column({ type: 'jsonb', nullable: true })
  about: AboutClass;

  @Column({ name: 'add_ons', type: 'jsonb', nullable: true })
  addOns: AddOnsDataModel[];

  @Column({ name: 'pricing', type: 'jsonb', nullable: true })
  pricing: PricingData;

  @Column({ name: 'duration', nullable: true })
  duration: number;

  @Column({
    type: 'integer',
    transformer: new EnumTransformer(Difficulty),
    nullable: true,
  })
  difficulty: string;

  @Column({ name: 'equipments_required', length: 100, nullable: true })
  equipmentsRequired: string;

  @Column({ name: 'photo_thumbnail', nullable: true })
  photoThumbnail: string;

  @Column({ name: 'photo_cover', nullable: true })
  photoCover: string;
  @Column({
    type: 'integer',
    transformer: new EnumTransformer(ClassStatus),
    nullable: true,
  })
  status: string;

  @ManyToOne(() => Gym, (gym) => gym.classes)
  gym: Gym;

  @ManyToMany(() => Instructor, (ins) => ins.classes)
  @JoinTable()
  instructor: Instructor[];

  @OneToMany(() => ClassCategorySubcategory, (ccs) => ccs.class)
  classCategorySubcategories: ClassCategorySubcategory[];

  @OneToOne(() => SessionSchedule, (ss) => ss.class)
  @JoinColumn()
  sessionSchedule: SessionSchedule;

  @OneToMany(() => Session, (session) => session.class)
  sessions: Session[];

  @OneToMany(() => Booking, (booking) => booking.class)
  bookings: Booking[];
}
