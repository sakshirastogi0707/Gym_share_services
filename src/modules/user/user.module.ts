import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { UserAuthMiddleware } from 'src/middlewares/auth.middleware';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { FitnessCategoryController } from './fitness.category.controller';
import { FitnessSubCategoryController } from './fitness.subcategory.controller';
import { FitnessCategoryService } from './fitness.category.service';
import { FitnessSubCategoryService } from './fitness.subcategory.service';
import { FitnessCategory } from './entity/fitness.category.entity';
import { FitnessSubCategory } from './entity/fitness.subcategory.entity';
import { UserCategorySubCategory } from './entity/user.category.subcategory.entity';
import { GymModule } from '../gym/gym.module';
import { Gym } from '../gym/entities/gym.entity';
import { SharedModule } from '../shared/shared.module';
import { EmailService } from 'src/utils/email.service';
import { Instructor } from '../instructor/entities/instructor.entity';

@Module({
  exports: [UserService],
  imports: [
    forwardRef(() => GymModule),
    SharedModule,
    TypeOrmModule.forFeature([
      User,
      Gym,
      FitnessCategory,
      FitnessSubCategory,
      UserCategorySubCategory,
      Instructor,
    ]),
  ],
  controllers: [
    UserController,
    FitnessCategoryController,
    FitnessSubCategoryController,
  ],
  providers: [
    UserService,
    FitnessCategoryService,
    FitnessSubCategoryService,
    EmailService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      .exclude({
        path: 'users/check-duplicate-mobile',
        method: RequestMethod.POST,
      })
      .forRoutes(UserController);
    consumer
      .apply(UserMiddleware)
      .exclude(
        { path: 'users/signup', method: RequestMethod.POST },
        { path: 'users/early-signup', method: RequestMethod.POST },
        { path: 'users/check-duplicate-mobile', method: RequestMethod.POST },
      )
      .forRoutes(UserController);
  }
}
