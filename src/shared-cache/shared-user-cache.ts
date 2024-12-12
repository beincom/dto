import { CACHE_KEYS } from '@beincom/constants';

export class SharedUserCacheKey {
  private static PREFIX = 'user';
  private static hashTag = '{1}';

  public static usernameById(userId: string): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.USERNAME, userId].join(':');
  }

  public static profileByUserName(username: string): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.USER_PROFILE, username].join(':');
  }

  public static allProfilesOfUser(userId: string): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.USER_PROFILES, userId].join(':');
  }

  public static userSettingsOfUser(userId: string): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.USER_SETTING, userId].join(':');
  }

  public static userOwnershipNftLinked(userId: string): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.USER_OWNERSHIP_NFT_LINKED, userId].join(':');
  }

  /**
   * @deprecated
   */
  public static getTokenValidationHashKey(username: string): string {
    return [this.PREFIX, CACHE_KEYS.TOKEN_VALIDATION.HASH, username].join(':');
  }

  public static getUserCronHealthCheckKey(identifier: string): string {
    return [this.PREFIX, this.hashTag, 'USER_CRON_JOB', identifier].join(':');
  }

  public static getReferralLeaderboardRankingsKey(): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.REFERRAL_LEADERBOARD.RANKINGS].join(':');
  }

  public static getReferralLeaderboardUpdatedAtKey(): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.REFERRAL_LEADERBOARD.UPDATED_AT].join(':');
  }

  public static getReferralLeaderboardLatestSnapshotTSKey(): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.REFERRAL_LEADERBOARD.SNAPSHOT_TS].join(':');
  }
}
