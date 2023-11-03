import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Gym } from '../gym/entities/gym.entity';
import { AdminAuthMiddleware } from 'src/middlewares/admin-auth.middleware';
import { EmailService } from 'src/utils/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Gym])],
  controllers: [AdminController],
  providers: [AdminService, EmailService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminAuthMiddleware).forRoutes(AdminController);
  }
}
