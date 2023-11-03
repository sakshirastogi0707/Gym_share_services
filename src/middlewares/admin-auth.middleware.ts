import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { admin } from '../utils/firebase.utils';
import { getAdminUIDs } from '../utils/secrets-manager';

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authVal = req.headers?.authorization;
      if (!authVal || !authVal.toString().includes('Bearer')) {
        throw new UnauthorizedException({
          status: false,
          message: 'authorization header is missing or invalid',
        });
      }

      const AdminUIDList = await getAdminUIDs();
      const token = authVal.toString().split(' ')[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uuid = decodedToken.uid;
      if (!AdminUIDList.includes(uuid)) {
        throw new UnauthorizedException({
          status: false,
          message: 'Unauthorized Access',
        });
      }
      next();
    } catch (error) {
      throw new UnauthorizedException({
        status: false,
        message: 'Unauthorized Access',
      });
    }
  }
}
