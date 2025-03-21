import { CACHE_KEYS } from '@beincom/constants';

/**
 * @deprecated Move to @beincom/constants@5.18.1
 */
export class SharedGroupCacheKey {
  private static PREFIX = 'group';
  private static hashTag = '{1}';

  public static groupById(groupId: string): string {
    return [SharedGroupCacheKey.PREFIX, SharedGroupCacheKey.hashTag, 'shared_group', groupId].join(
      ':',
    );
  }

  public static joinedGroupsOfUser(userId: string): string {
    return [
      SharedGroupCacheKey.PREFIX,
      SharedGroupCacheKey.hashTag,
      CACHE_KEYS.JOINED_GROUPS,
      userId,
    ].join(':');
  }

  public static communityPermissionsOfUser(userId: string): string {
    return [
      SharedGroupCacheKey.PREFIX,
      SharedGroupCacheKey.hashTag,
      CACHE_KEYS.COMMUNITY_PERMISSION,
      userId,
    ].join(':');
  }

  public static groupPermissionsOfUser(userId: string): string {
    return [
      SharedGroupCacheKey.PREFIX,
      SharedGroupCacheKey.hashTag,
      CACHE_KEYS.GROUP_PERMISSION,
      userId,
    ].join(':');
  }

  public static showingBadgeOfUser(userId: string): string {
    return [
      SharedGroupCacheKey.PREFIX,
      SharedGroupCacheKey.hashTag,
      CACHE_KEYS.SHOWING_BADGES,
      userId,
    ].join(':');
  }

  public static bannedTargetsOfUser(userId: string): string {
    return [
      SharedGroupCacheKey.PREFIX,
      SharedGroupCacheKey.hashTag,
      CACHE_KEYS.BANNED_TARGETS_OF_USER,
      userId,
    ].join(':');
  }
}
