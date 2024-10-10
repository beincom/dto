import { CACHE_KEYS } from '@beincom/constants';

export class SharedMissionCacheKey {
  private static PREFIX = 'mission';

  public static getJackpotAchieved(): string {
    return [SharedMissionCacheKey.PREFIX, `{1}`, CACHE_KEYS.MISSION.JACKPOT_ACHIEVED].join(':');
  }

  public static getJackpotMedalConversionRate(): string {
    return [
      SharedMissionCacheKey.PREFIX,
      `{1}`,
      CACHE_KEYS.MISSION.JACKPOT_MEDAL_CONVERSION_RATE,
    ].join(':');
  }

  public static getJackpotSegments(): string {
    return [SharedMissionCacheKey.PREFIX, `{1}`, CACHE_KEYS.MISSION.JACKPOT_SEGMENTS].join(':');
  }
}
