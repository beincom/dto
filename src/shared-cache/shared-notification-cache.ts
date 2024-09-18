import { CACHE_KEYS } from '@beincom/constants';

export class SharedNotificationCacheKey {
  public static PREFIX = 'notification';

  public static getUserOnlineKey(): string {
    return [SharedNotificationCacheKey.PREFIX, CACHE_KEYS.USER_ONLINE].join(':');
  }
}
