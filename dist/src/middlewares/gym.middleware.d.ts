import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { GymService } from 'src/modules/gym/gym.service';
export declare class GymMiddleware implements NestMiddleware {
    private readonly gymService;
    constructor(gymService: GymService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
