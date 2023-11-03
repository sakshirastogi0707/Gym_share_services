"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_settings_entity_1 = require("./entities/account-settings.entity");
const typeorm_2 = require("typeorm");
let AccountSettingsService = class AccountSettingsService {
    constructor(accountSettingsRepository = new typeorm_2.Repository()) {
        this.accountSettingsRepository = accountSettingsRepository;
    }
    async updateAccountSettings(userId, payload) {
        let accountSettings = await this.accountSettingsRepository.findOne({
            user: userId,
        });
        if (!accountSettings) {
            accountSettings = new account_settings_entity_1.AccountSettings();
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
            throw new common_1.NotFoundException('Account settings not found!');
        }
        return accountSettings;
    }
};
AccountSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_settings_entity_1.AccountSettings)),
    __metadata("design:paramtypes", [Object])
], AccountSettingsService);
exports.AccountSettingsService = AccountSettingsService;
//# sourceMappingURL=account-settings.service.js.map