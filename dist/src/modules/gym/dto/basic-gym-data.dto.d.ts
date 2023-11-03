import { BaseResponseDto } from 'src/utils/base.response.dto';
import { AmenitiyDataModal } from './amenities-data.dto';
import { AboutClass } from 'src/modules/class/dto/class.dto';
export declare class BasicGymDataDto {
    businessName: string;
    businessAddress: string;
    photos: string;
    description: string;
    status: number;
    amenities?: [AmenitiyDataModal];
}
export declare class BasicGymDataResponseDto extends BaseResponseDto {
    data: BasicGymDataDto;
}
export declare class UserGymClassesDetailDto {
    name: string;
    about: AboutClass;
    photoThumbnail: string;
    duration: number;
}
export declare class UserGymDetailData extends BasicGymDataDto {
    classes?: [UserGymClassesDetailDto];
}
export declare class UserGymDetailDataResponseDto {
    data: UserGymDetailData;
}
