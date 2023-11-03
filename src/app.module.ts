import { Module } from '@nestjs/common';
import { MailerModule} from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigAsync } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { GymModule } from './modules/gym/gym.module';
import { InstructorModule } from './modules/instructor/instructor.module';
import { MulterModule } from '@nestjs/platform-express';
import { ClassModule } from './modules/class/class.module';
import { AmenityModule } from './modules/gym/amenity.module';
import { SharedModule } from './modules/shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { BookingModule } from './modules/booking/booking.module';
import Handlebars from 'handlebars';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeormConfigAsync),
    UserModule,
    GymModule,
    AdminModule,
    AmenityModule,
    InstructorModule,
    ClassModule,
    SharedModule,
    PaymentsModule,
    CouponModule,
    BookingModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory:async (configService: ConfigService)=>({
        transport:{
          host: configService.get('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          auth: {
            user: configService.get('SMTP_USERNAME'),
            pass: configService.get('SMTP_PASSWORD'),
          },
        },
        defaults:{
          from: configService.get('FROM_EMAIL'),
        },
        template: {
          dir: process.cwd() + '/src/templates/',
          adapter: new HandlebarsAdapter(undefined,{
            inlineCssEnabled: true
          }),
          options: {
            strict: true,
          },
        },
      }),
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
