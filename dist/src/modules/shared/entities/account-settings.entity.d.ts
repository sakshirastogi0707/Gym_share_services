import { User } from 'src/modules/user/entity/user.entity';
import { BaseModel } from 'src/utils/base.model';
export declare class AccountSettings extends BaseModel {
    notificationsEnabled: boolean;
    remindersEnabled: boolean;
    user: User;
}
