import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Class } from './entities/class.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassCategorySubcategory } from './entities/class-category-subcategory.entity';
import { SessionSchedule } from './entities/session-schedule.entity';
import { Instructor } from '../instructor/entities/instructor.entity';
import { Gym } from '../gym/entities/gym.entity';
import { UserAuthMiddleware } from 'src/middlewares/auth.middleware';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { Session } from './entities/session.entity';
import { User } from '../user/entity/user.entity';
import { Favourites } from './entities/favourites.entity';
import { GuestUserMiddleware } from 'src/middlewares/guest-user-middleware';
@Module({
  exports: [],
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([
      Class,
      ClassCategorySubcategory,
      SessionSchedule,
      Instructor,
      Gym,
      Session,
      Favourites,
      User,
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService, Class],
})
export class ClassModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes(ClassController);
    consumer.apply(UserMiddleware).forRoutes(ClassController);
    consumer.apply(GuestUserMiddleware).forRoutes(
      {
        path: 'class/:classId/favourites',
        method: RequestMethod.ALL,
      },
      {
        path: 'class/favourites',
        method: RequestMethod.GET,
      },
    );
  }
}
