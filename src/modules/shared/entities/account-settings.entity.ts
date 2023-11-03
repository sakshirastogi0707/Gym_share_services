import { User } from 'src/modules/user/entity/user.entity';
import { BaseModel } from 'src/utils/base.model';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('account_settings')
export class AccountSettings extends BaseModel {
  @Column({
    name: 'notifications_enabled',
  })
  notificationsEnabled: boolean;

  @Column({
    name: 'reminders_enabled',
  })
  remindersEnabled: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
