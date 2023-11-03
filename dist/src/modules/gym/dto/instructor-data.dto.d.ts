import { BaseResponseDto } from 'src/utils/base.response.dto';
export declare class InstructorDataDto {
    name: string;
    photo: string;
    dob: string;
    about: string;
    exp_years: number;
    exp_months: number;
    active: boolean;
    gymId: number;
}
export declare class InstructorDetailsReponse extends BaseResponseDto {
    data: InstructorDataDto;
}
