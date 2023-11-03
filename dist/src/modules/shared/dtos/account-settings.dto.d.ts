import { BaseResponseDto } from 'src/utils/base.response.dto';
export declare class AccountSettings {
    notificationsEnabled: boolean;
    remindersEnabled: boolean;
}
export declare class GetAccountSettings extends BaseResponseDto {
    data: AccountSettings;
}
