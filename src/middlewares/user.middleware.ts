import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserStatus } from 'src/enums/user-type-status.enum';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getUser(
        req['firebase_uuid'],
        req['email_id'],
      );
      if (user.userStatus === UserStatus.Unverified && req['phone_number']) {
        user.phoneNumber = req['phone_number'];
        user.userStatus = UserStatus.Approved;
        user.save();
      }

      req['user'] = user;

      next();
    } catch (error) {
      if (error?.response?.statusCode === HttpStatus.NOT_FOUND) {
        throw new NotFoundException('User not found !');
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
