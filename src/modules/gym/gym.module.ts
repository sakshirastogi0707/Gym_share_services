import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { GymService } from './gym.service';
import { GymController } from './gym.controller';
import { Gym } from './entities/gym.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from 'src/middlewares/auth.middleware';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { UserModule } from '../user/user.module';
import { User } from '../user/entity/user.entity';
import { GymCategorySubCategory } from './entities/gym.category.subcategory.entity';
import { Business_Hour } from './entities/business_hour.entity';
import { Instructor } from '../instructor/entities/instructor.entity';
import { Amenity } from './entities/amenity.entity';
import { GymMiddleware } from 'src/middlewares/gym.middleware';
import { Class } from '../class/entities/class.entity';
import { InstructorTrainedFor } from '../instructor/entities/trained_for.entity';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  exports: [GymService],
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => PaymentsModule),
    TypeOrmModule.forFeature([
      User,
      Gym,
      GymCategorySubCategory,
      Business_Hour,
      Amenity,
      Instructor,
      Class,
      InstructorTrainedFor,
    ]),
  ],
  controllers: [GymController],
  providers: [GymService],
})
export class GymModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes(GymController);
    consumer.apply(UserMiddleware).forRoutes(GymController);
    consumer
      .apply(GymMiddleware)
      .exclude({
        path: 'gym/:id/reviews',
        method: RequestMethod.GET,
      })
      .forRoutes(GymController);
  }
}
