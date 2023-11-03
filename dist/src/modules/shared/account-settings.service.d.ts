import { AccountSettings } from './entities/account-settings.entity';
import { AccountSettings as AccountSettingsDto } from './dtos/account-settings.dto';
import { Repository } from 'typeorm';
export declare class AccountSettingsService {
    private accountSettingsRepository;
    constructor(accountSettingsRepository?: Repository<AccountSettings>);
    updateAccountSettings(userId: any, payload: AccountSettingsDto): Promise<void>;
    getAccountSettings(userId: any): Promise<AccountSettings>;
}
