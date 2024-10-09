import { CACHE_KEYS } from '@beincom/constants';

export class SharedMissionCacheKey {
  private static PREFIX = 'mission';

  public static getJackpotAchieved(userId: string): string {
    return [SharedMissionCacheKey.PREFIX, `{1}`, CACHE_KEYS.MISSION.JACKPOT_ACHIEVED, userId].join(
      ':',
    );
  }

  public static getJackpotMedalConversionRate(userId: string): string {
    return [
      SharedMissionCacheKey.PREFIX,
      `{1}`,
      CACHE_KEYS.MISSION.JACKPOT_MEDAL_CONVERSION_RATE,
      userId,
    ].join(':');
  }

  public static getJackpotSegments(userId: string): string {
    return [SharedMissionCacheKey.PREFIX, `{1}`, CACHE_KEYS.MISSION.JACKPOT_SEGMENTS, userId].join(
      ':',
    );
  }
}
