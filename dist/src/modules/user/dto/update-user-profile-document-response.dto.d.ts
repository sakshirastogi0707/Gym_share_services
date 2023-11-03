import { BaseResponseDto } from '../../../utils/base.response.dto';
import { UpdateUserProfileDocumentRequestDto } from './update-user-profile-document-request.dto';
export declare class UserProfileDocumentUpdateSuccessDto extends BaseResponseDto {
    stepName: string;
    data: UpdateUserProfileDocumentRequestDto;
}
