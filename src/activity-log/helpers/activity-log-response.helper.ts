import { ActivityLogObjectIdDTO, ActivityResponseDto } from '../dtos';
import { ACTIVITY_LOG_USE_CASES } from '../enums';
import { ActivityLogUseCaseClassesMap } from '../index';

export function getAllObjectIdFromLogs(
  logs: ActivityResponseDto[],
): Required<ActivityLogObjectIdDTO> {
  const setOfUserIds: Set<string> = new Set();
  const setOfCommunityIds: Set<string> = new Set();
  const setOfGroupIds: Set<string> = new Set();
  const setOfBadgeIds: Set<string> = new Set();

  for (const log of logs) {
    const useCase: ACTIVITY_LOG_USE_CASES = log.useCase;
    const useCaseClass: any = ActivityLogUseCaseClassesMap.get(useCase);
    if (useCaseClass) {
      const instance = new useCaseClass(log);
      const {
        userIds = [],
        groupIds = [],
        badgeIds = [],
        communityIds = [],
      }: ActivityLogObjectIdDTO = instance.toObjectIds();

      userIds.forEach((id: string) => id && setOfUserIds.add(id));
      groupIds.forEach((id: string) => id && setOfGroupIds.add(id));
      badgeIds.forEach((id: string) => id && setOfBadgeIds.add(id));
      communityIds.forEach((id: string) => id && setOfCommunityIds.add(id));
    }
  }

  return {
    userIds: Array.from(setOfUserIds) as string[],
    groupIds: Array.from(setOfGroupIds) as string[],
    badgeIds: Array.from(setOfBadgeIds) as string[],
    communityIds: Array.from(setOfCommunityIds) as string[],
  };
}
