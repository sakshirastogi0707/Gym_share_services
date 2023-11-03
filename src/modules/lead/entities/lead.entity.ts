import { BaseModel } from 'src/utils/base.model';
import { Column, Entity } from 'typeorm';

@Entity('leads')
export class Lead extends BaseModel {
  @Column({
    name: 'name',
    nullable: false,
    length: 50,
  })
  name: string;

  @Column({
    name: 'email_id',
    nullable: false,
    length: 100,
    unique: true,
  })
  emailId: string;

  @Column({
    name: 'phone_number',
    length: 50,
    unique: true,
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    name: 'address',
    nullable: false,
  })
  address: string;

  @Column({
    name: 'lead_type',
    nullable: false,
  })
  leadType: number;
}
