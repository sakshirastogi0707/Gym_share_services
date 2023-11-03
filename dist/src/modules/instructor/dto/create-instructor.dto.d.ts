import { TrainedForDataModel } from './trained_for.model';
import { Certificate } from './certificate.model';
import { BaseResponseDto } from 'src/utils/base.response.dto';
export declare class CreateInstructorDto {
    name: string;
    photo: string;
    trainedFor: [TrainedForDataModel];
    about: string;
    expYears: number;
    expMonths: number;
    dob: Date;
    gymId: number;
    certificates: [Certificate];
}
export declare class CreateInstructorSuccessDto extends BaseResponseDto {
    data: CreateInstructorDto;
}
export declare class UpdateInstructorDto {
    name: string;
    photo: string;
    trainedFor: [TrainedForDataModel];
    about: string;
    expYears: number;
    expMonths: number;
    dob: Date;
    gymId: number;
    certificates: [Certificate];
}
export declare class UpdateInstructorResponseSuccessDto extends BaseResponseDto {
    data: UpdateInstructorDto;
}
export declare class GetAllInstructorResponseSuccessDto extends BaseResponseDto {
    data: [CreateInstructorDto];
}
