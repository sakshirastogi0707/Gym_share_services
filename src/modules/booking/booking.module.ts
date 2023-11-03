import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { Class } from '../class/entities/class.entity';
import { Session } from '../class/entities/session.entity';
import { UserAuthMiddleware } from 'src/middlewares/auth.middleware';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { User } from '../user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  exports: [],
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Booking, User, Class, Session]),
  ],
  controllers: [BookingController],
  providers: [BookingService, Booking],
})
export class BookingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes(BookingController);
    consumer.apply(UserMiddleware).forRoutes(BookingController);
  }
}
