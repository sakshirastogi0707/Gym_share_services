import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountSettings } from './entities/account-settings.entity';
import { AccountSettings as AccountSettingsDto } from './dtos/account-settings.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AccountSettingsService {
  constructor(
    @InjectRepository(AccountSettings)
    private accountSettingsRepository = new Repository<AccountSettings>(),
  ) {}

  async updateAccountSettings(userId, payload: AccountSettingsDto) {
    let accountSettings = await this.accountSettingsRepository.findOne({
      user: userId,
    });
    if (!accountSettings) {
      accountSettings = new AccountSettings();
      accountSettings.user = userId;
    }
    accountSettings.notificationsEnabled = payload.notificationsEnabled;
    accountSettings.remindersEnabled = payload.remindersEnabled;
    accountSettings.save();
  }

  async getAccountSettings(userId) {
    const accountSettings = await this.accountSettingsRepository.findOne({
      where: [{ user: userId }],
    });

    if (!accountSettings) {
      throw new NotFoundException('Account settings not found!');
    }

    return accountSettings;
  }
}
