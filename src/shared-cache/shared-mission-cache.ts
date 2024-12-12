import { CACHE_KEYS } from '@beincom/constants';

export class SharedMissionCacheKey {
  private static PREFIX = 'mission';
  private static hashTag = '{1}';

  public static getJackpotAchieved(): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.MISSION.JACKPOT_ACHIEVED].join(':');
  }

  public static getJackpotMedalConversionRate(): string {
    return [
      this.PREFIX,
      this.hashTag,
      CACHE_KEYS.MISSION.JACKPOT_MEDAL_CONVERSION_RATE,
    ].join(':');
  }

  public static getJackpotSegments(): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.MISSION.JACKPOT_SEGMENTS].join(':');
  }

  public static getJackpotActivities(): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.MISSION.JACKPOT_ACTIVITIES].join(':');
  }

  public static getRateLimiter(): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.MISSION.RATE_LIMIT].join(':');
  }

  public static getJackpotNRU(): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.MISSION.JACKPOT_NRU].join(':');
  }

  public static getJackpotRef(): string {
    return [this.PREFIX, this.hashTag, CACHE_KEYS.MISSION.JACKPOT_REF].join(':');
  }
}
