import * as Cache from 'cache';

export const CacheManager = {
  '1HourCache': new Cache(1000 * 60 * 60),
};
