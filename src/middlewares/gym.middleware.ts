import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { GymService } from 'src/modules/gym/gym.service';

@Injectable()
export class GymMiddleware implements NestMiddleware {
  constructor(
    @Inject(GymService)
    private readonly gymService: GymService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.params['id']) {
      next();
    }
    try {
      const gym = await this.gymService.gymExists(parseInt(req.params['id']));
      if (gym.user.id !== req['user'].id) {
        throw new ForbiddenException("You don't have access to this gym");
      }
      next();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
