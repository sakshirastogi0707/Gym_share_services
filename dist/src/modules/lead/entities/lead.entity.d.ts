import { BaseModel } from 'src/utils/base.model';
export declare class Lead extends BaseModel {
    name: string;
    emailId: string;
    phoneNumber: string;
    address: string;
    leadType: number;
}
