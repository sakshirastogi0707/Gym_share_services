import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { Instructor } from './entities/instructor.entity';
import { InstructorTrainedFor } from './entities/trained_for.entity';
import { Certificate } from './entities/certificate.entity';
import { FitnessCategory } from '../user/entity/fitness.category.entity';
import { FitnessSubCategory } from '../user/entity/fitness.subcategory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthMiddleware } from 'src/middlewares/auth.middleware';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { UserModule } from '../user/user.module';
import { Gym } from '../gym/entities/gym.entity';

@Module({
  exports: [],
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([
      Gym,
      Instructor,
      InstructorTrainedFor,
      Certificate,
      FitnessCategory,
      FitnessSubCategory,
    ]),
  ],
  controllers: [InstructorController],
  providers: [InstructorService],
})
export class InstructorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes(InstructorController);
    consumer.apply(UserMiddleware).forRoutes(InstructorController);
  }
}
