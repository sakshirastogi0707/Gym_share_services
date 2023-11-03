import { AddOnsDataModel } from 'src/modules/class/dto/add-ons-data.dto';
import { Class } from 'src/modules/class/entities/class.entity';
import { Session } from 'src/modules/class/entities/session.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { BaseModel } from 'src/utils/base.model';
import { SomeoneElseModel } from '../dto/someoneElse.dto';
export declare class Booking extends BaseModel {
    user: User;
    class: Class;
    sessions: Session[];
    bookingFor: string;
    bookingTime: Date;
    coupon: string;
    addOns: AddOnsDataModel[];
    isForSomeoneElse: boolean;
    someoneElse: SomeoneElseModel;
    status: string;
    isActive: boolean;
}
