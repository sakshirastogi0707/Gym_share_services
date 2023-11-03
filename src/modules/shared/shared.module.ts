import { Module } from '@nestjs/common';
import { AccountSettings } from './entities/account-settings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSettingsService } from './account-settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSettings])],
  providers: [AccountSettingsService],
  exports: [AccountSettingsService],
})
export class SharedModule {}
