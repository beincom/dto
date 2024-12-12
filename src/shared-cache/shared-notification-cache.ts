import { CACHE_KEYS } from '@beincom/constants';

export class SharedNotificationCacheKey {
  public static PREFIX = 'notification';

  public static getUserOnlineKey(): string {
    return [this.PREFIX, CACHE_KEYS.USER_ONLINE].join(':');
  }
}
