import { CACHE_KEYS } from '@beincom/constants';

export class SharedUserCacheKey {
  private static PREFIX = 'user';

  public static usernameById(userId: string): string {
    return [SharedUserCacheKey.PREFIX, `{1}`, CACHE_KEYS.USERNAME, userId].join(':');
  }

  public static profileByUserName(username: string): string {
    return [SharedUserCacheKey.PREFIX, `{1}`, CACHE_KEYS.USER_PROFILE, username].join(':');
  }

  public static allProfilesOfUser(userId: string): string {
    return [SharedUserCacheKey.PREFIX, `{1}`, CACHE_KEYS.USER_PROFILES, userId].join(':');
  }

  public static userSettingsOfUser(userId: string): string {
    return [SharedUserCacheKey.PREFIX, `{1}`, CACHE_KEYS.USER_SETTING, userId].join(':');
  }

  public static userOwnershipNftLinked(userId: string): string {
    return [SharedUserCacheKey.PREFIX, `{1}`, CACHE_KEYS.USER_OWNERSHIP_NFT_LINKED, userId].join(
      ':',
    );
  }

  public static getTokenValidationHashKey(username: string): string {
    return [
      SharedUserCacheKey.PREFIX,
      CACHE_KEYS.TOKEN_VALIDATION.HASH,
      username,
    ].join(':');
  }
}
