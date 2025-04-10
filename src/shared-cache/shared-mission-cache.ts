import { CACHE_KEYS } from '@beincom/constants';

/**
 * @deprecated Move to @beincom/constants@5.18.1
 */
export class SharedMissionCacheKey {
  private static PREFIX = 'mission';
  private static hashTag = '{1}';

  public static getJackpotAchieved(): string {
    return [
      SharedMissionCacheKey.PREFIX,
      SharedMissionCacheKey.hashTag,
      CACHE_KEYS.MISSION.JACKPOT_ACHIEVED,
    ].join(':');
  }

  public static getJackpotMedalConversionRate(): string {
    return [
      SharedMissionCacheKey.PREFIX,
      SharedMissionCacheKey.hashTag,
      CACHE_KEYS.MISSION.JACKPOT_MEDAL_CONVERSION_RATE,
    ].join(':');
  }

  public static getJackpotSegments(): string {
    return [
      SharedMissionCacheKey.PREFIX,
      SharedMissionCacheKey.hashTag,
      CACHE_KEYS.MISSION.JACKPOT_SEGMENTS,
    ].join(':');
  }

  public static getJackpotActivities(): string {
    return [
      SharedMissionCacheKey.PREFIX,
      SharedMissionCacheKey.hashTag,
      CACHE_KEYS.MISSION.JACKPOT_ACTIVITIES,
    ].join(':');
  }

  public static getRateLimiter(): string {
    return [
      SharedMissionCacheKey.PREFIX,
      SharedMissionCacheKey.hashTag,
      CACHE_KEYS.MISSION.RATE_LIMIT,
    ].join(':');
  }

  public static getJackpotNRU(): string {
    return [
      SharedMissionCacheKey.PREFIX,
      SharedMissionCacheKey.hashTag,
      CACHE_KEYS.MISSION.JACKPOT_NRU,
    ].join(':');
  }

  public static getJackpotRef(): string {
    return [
      SharedMissionCacheKey.PREFIX,
      SharedMissionCacheKey.hashTag,
      CACHE_KEYS.MISSION.JACKPOT_REF,
    ].join(':');
  }
}
