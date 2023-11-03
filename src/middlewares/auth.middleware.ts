import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { admin } from '../utils/firebase.utils';

@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers) throw new BadRequestException();

      if (req.headers) {
        const authorizationKey = req.headers.hasOwnProperty('authorization');
        const authVal = req.headers.authorization;

        let token: any;
        if (!authorizationKey) throw new NotFoundException();

        if (!authVal || !authVal.toString().includes('Bearer'))
          throw new NotFoundException();

        // eslint-disable-next-line prefer-const
        token = authVal.toString().split(' ')[1];
        const decodedToken = await admin.auth().verifyIdToken(token && token);
        const uuid = decodedToken.uid;
        const emailId = decodedToken.email;
        const phoneNumber = decodedToken.phone_number;

        req['firebase_uuid'] = uuid;
        req['email_id'] = emailId;
        req['phone_number'] = phoneNumber;

        next();
      }
    } catch (error) {
      if (
        error.code === 'auth/argument-error' ||
        error.code === 'auth/id-token-expired' ||
        error?.response?.statusCode === HttpStatus.BAD_REQUEST ||
        error?.response?.statusCode === HttpStatus.NOT_FOUND
      )
        throw new UnauthorizedException('Unauthorized Access');

      throw new InternalServerErrorException('Server Error !');
    }
  }
}
