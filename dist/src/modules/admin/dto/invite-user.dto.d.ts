import { UserType } from 'src/enums/user-type.enum';
import { BaseResponseDto } from 'src/utils/base.response.dto';
export declare class InviteUserRequestDto {
    fullName: string;
    emailId: string;
    userType: UserType;
}
export declare class AdminUserViewData {
    fullName: string;
    emailId: string;
    phoneNumber: string;
    source: string;
    userStatus: string;
    userType: UserType;
}
export declare class GetUserViewResponseSuccessDto extends BaseResponseDto {
    data: AdminUserViewData;
}
