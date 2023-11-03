import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Coupon } from './entities/coupon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { AdminAuthMiddleware } from 'src/middlewares/admin-auth.middleware';
import { UserAuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .exclude(
        { path: 'coupon/user/:id', method: RequestMethod.GET }, // Exclude GET couponById /coupon/user/:id route
        { path: 'coupon/user', method: RequestMethod.GET }, // Exclude GET All coupons /coupon/user route
      )
      .forRoutes(CouponController); // Apply admin auth middleware to all routes except the excluded route

    consumer.apply(UserAuthMiddleware).forRoutes(
      { path: 'coupon/user/:id', method: RequestMethod.GET }, // Apply user auth middleware only to GET couponById /coupon/user/:id route
      { path: 'coupon/user', method: RequestMethod.GET }, // Apply user auth middleware only to GETAll coupons /coupon/user route
    );
  }
}
