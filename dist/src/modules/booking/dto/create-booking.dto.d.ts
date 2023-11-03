import { AddOnsDataModel } from 'src/modules/class/dto/add-ons-data.dto';
import { SomeoneElseModel } from './someoneElse.dto';
export declare class CreateBookingDto {
    class: number;
    sessions: number[];
    bookingFor: string;
    addOns: AddOnsDataModel[];
    coupon: string;
    isForSomeoneElse: boolean;
    someoneElse: SomeoneElseModel;
}
