import { CACHE_KEYS } from '@beincom/constants';

/**
 * @deprecated Move to @beincom/constants@5.18.1
 */
export class SharedNotificationCacheKey {
  static PREFIX = 'notification';

  public static getUserOnlineKey(): string {
    return [SharedNotificationCacheKey.PREFIX, CACHE_KEYS.USER_ONLINE].join(':');
  }
}
