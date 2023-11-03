import { LeadType } from 'src/enums/lead-type.enum';
export declare class CreateLeadDto {
    name: string;
    emailId: string;
    phoneNumber: string | any;
    address: string;
    leadType: LeadType;
}
