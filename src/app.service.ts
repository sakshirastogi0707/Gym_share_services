import { Injectable } from '@nestjs/common';
import { BaseUtils } from './utils/base.utils';

@Injectable()
export class AppService {
  getHealth(): any {
    return {
      status: 'OK',
      time: BaseUtils.formatTimeUTC(),
    };
  }
}
