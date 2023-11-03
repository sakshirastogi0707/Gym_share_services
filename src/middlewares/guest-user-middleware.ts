import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserType } from 'src/enums/user-type.enum';

@Injectable()
export class GuestUserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req['user'].userType !== UserType.User) {
        throw new UnauthorizedException('Unauthorised user!');
      }
      next();
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new InternalServerErrorException('Server Error !');
    }
  }
}
