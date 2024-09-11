import { CACHE_KEYS } from '@beincom/constants';

export class SharedGroupCacheKey {
  private static PREFIX = 'group';

  public static groupById(groupId: string): string {
    return [SharedGroupCacheKey.PREFIX, `{1}`, 'shared_group', groupId].join(':');
  }

  public static joinedGroupsOfUser(userId: string): string {
    return [SharedGroupCacheKey.PREFIX, `{1}`, CACHE_KEYS.JOINED_GROUPS, userId].join(':');
  }

  public static communityPermissionsOfUser(userId: string): string {
    return [SharedGroupCacheKey.PREFIX, `{1}`, CACHE_KEYS.COMMUNITY_PERMISSION, userId].join(':');
  }

  public static groupPermissionsOfUser(userId: string): string {
    return [SharedGroupCacheKey.PREFIX, `{1}`, CACHE_KEYS.GROUP_PERMISSION, userId].join(':');
  }

  public static showingBadgeOfUser(userId: string): string {
    return [SharedGroupCacheKey.PREFIX, `{1}`, CACHE_KEYS.SHOWING_BADGES, userId].join(':');
  }
}
