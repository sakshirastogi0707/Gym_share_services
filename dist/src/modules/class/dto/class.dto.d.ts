import { AddOnsDataModel } from './add-ons-data.dto';
import { SessionScheduleDto, UpdateSessionScheduleDto } from './session-schedule.dto';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { PricingData } from './pricing.dto';
import { BaseListDto } from 'src/utils/dtos/base.list.dto';
import { BaseListSortDto } from 'src/utils/dtos/base.list.sort.dto';
export declare class AboutClass {
    description: string;
    estimated_calorie_burn: number;
    targeted_body_parts: string;
}
export declare class UpdateAboutClass {
    description: string;
    estimated_calorie_burn: number;
    targeted_body_parts: string;
}
export declare class ClassDto {
    name: string;
    spots: number;
    about: AboutClass;
    pricing: PricingData;
    addOns: AddOnsDataModel[];
    difficulty: string;
    equipmentsRequired: string;
    photoThumbnail: string;
    photoCover: string;
    instructor: number;
    category: number;
    subCategories: number[];
    sessionSchedule: SessionScheduleDto;
    status: string;
}
export declare class ClassResponseDto extends ClassDto {
    id: number;
}
export declare class CreateClassSuccessDto extends BaseResponseDto {
    data: ClassResponseDto;
}
export declare class ListClassSuccessDto extends BaseResponseDto {
    data: [ClassResponseDto];
}
export declare class UpdateClassDataDto {
    name: string;
    spots: number;
    about: UpdateAboutClass;
    pricing: PricingData;
    equipmentsRequired: string;
    instructor: number;
    sessionSchedule: UpdateSessionScheduleDto;
}
export declare class UpdateClassSuccessResponseDto extends BaseResponseDto {
    data: [UpdateClassDataDto];
}
export declare class ClassListRequestParamsDto extends BaseListDto {
    name?: string;
    status?: string;
    startTime: string;
    endTime: string;
    categoryIds: [number];
    startDate: string;
    endDate: string;
    trainerIds: [number];
    difficulty: string;
    priceMin: number;
    priceMax: number;
    slotsMin: number;
    slotsMax: number;
}
export declare class ClassListSortRequestParamsDto extends BaseListSortDto {
    name?: string;
    startTime: string;
    endTime: string;
    categoryIds: [number];
    startDate: string;
    endDate: string;
    trainerIds: [number];
    difficulty: string;
    priceMin: number;
    priceMax: number;
    slotsMin: number;
    slotsMax: number;
}
export declare class FavouritesListDto extends BaseListDto {
    name?: string;
}
export declare class FavouriteClassDto {
    class_id: number;
    class_name: string;
    class_difficulty: string;
    sessionSchedule_start_date: string;
    sessionSchedule_start_time: string;
    instructor_name: string;
    photo_thumbnail: string;
    duration: object;
}
declare class FavPaginated {
    classes: [FavouriteClassDto];
    count: number;
}
export declare class FavouritesListResponseDto extends BaseResponseDto {
    data: FavPaginated;
}
export {};
