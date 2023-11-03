import { BaseResponseDto } from 'src/utils/base.response.dto';
export declare class AmenitiyDataModal {
    id: number;
    name: string;
    image: string;
    isActive: boolean;
}
export declare class AmentiesResponseDto extends BaseResponseDto {
    data: [AmenitiyDataModal];
}
