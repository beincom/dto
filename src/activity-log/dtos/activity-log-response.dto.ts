import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../enums';

export class ActivityResponseDto {
  id: string;
  useCase: ACTIVITY_LOG_USE_CASES;
  actorId?: string;
  communityId: string;
  groupId: string;
  eventTime: Date;
  eventType: ACTIVITY_EVENT_TYPES;
  objectType: ACTIVITY_OBJECT_TYPES;
  objectId: string;
  data: Record<string, any>;
}

export class ActivityPaginationResponseDto {
  total: number;
  limit: number;
  offset: number;
  page: number;
  data: ActivityResponseDto[];
}

export class ActivityPaginationCursorResponseDto extends ActivityPaginationResponseDto {
  cursors: {
    prev: string;
    next: string;
  };
}
