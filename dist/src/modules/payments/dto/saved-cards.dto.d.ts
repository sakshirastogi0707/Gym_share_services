import { BaseResponseDto } from '../../../utils/base.response.dto';
declare class SavedCardDTO {
    id: string;
    brand: string;
    funding: string;
    last4: string;
    default: boolean;
}
export declare class GetSavedCardsSuccessDTO extends BaseResponseDto {
    data: [SavedCardDTO];
}
export {};
