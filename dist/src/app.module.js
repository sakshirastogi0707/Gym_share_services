"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./config/typeorm.config");
const user_module_1 = require("./modules/user/user.module");
const gym_module_1 = require("./modules/gym/gym.module");
const instructor_module_1 = require("./modules/instructor/instructor.module");
const platform_express_1 = require("@nestjs/platform-express");
const class_module_1 = require("./modules/class/class.module");
const amenity_module_1 = require("./modules/gym/amenity.module");
const shared_module_1 = require("./modules/shared/shared.module");
const admin_module_1 = require("./modules/admin/admin.module");
const payments_module_1 = require("./modules/payments/payments.module");
const coupon_module_1 = require("./modules/coupon/coupon.module");
const booking_module_1 = require("./modules/booking/booking.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeormConfigAsync),
            user_module_1.UserModule,
            gym_module_1.GymModule,
            admin_module_1.AdminModule,
            amenity_module_1.AmenityModule,
            instructor_module_1.InstructorModule,
            class_module_1.ClassModule,
            shared_module_1.SharedModule,
            payments_module_1.PaymentsModule,
            coupon_module_1.CouponModule,
            booking_module_1.BookingModule,
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    transport: {
                        host: configService.get('SMTP_HOST'),
                        port: configService.get('SMTP_PORT'),
                        auth: {
                            user: configService.get('SMTP_USERNAME'),
                            pass: configService.get('SMTP_PASSWORD'),
                        },
                    },
                    defaults: {
                        from: configService.get('FROM_EMAIL'),
                    },
                    template: {
                        dir: process.cwd() + '/src/templates/',
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(undefined, {
                            inlineCssEnabled: true
                        }),
                        options: {
                            strict: true,
                        },
                    },
                }),
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map