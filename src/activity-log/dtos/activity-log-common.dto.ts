import { ACTIVITY_EVENT_TYPES, ACTIVITY_OBJECT_TYPES } from '../enums';

import {
  ActivityLogCommunityDTO,
  ActivityLogGroupDTO,
  ActivityLogUserDTO,
} from './activity-log-use-case.dto';

export class ActivityLogPayloadDTO<TPayload> {
  useCase: string;
  eventTime: number;
  data: TPayload;
}

export class ActivityLogDocumentDTO<TData> {
  useCase: string;
  eventTime: number;
  requestId?: string;
  actorId: string;
  communityId: string;
  groupId?: string;
  eventType: ACTIVITY_EVENT_TYPES;
  objectType: ACTIVITY_OBJECT_TYPES;
  objectId: string;
  data: TData;
}

export class ActivityLogObjectIdDTO {
  userIds?: string[];
  groupIds?: string[];
  communityIds?: string[];
}

export class ActivityLogObjectDataDTO {
  users: Record<string, ActivityLogUserDTO>;
  groups: Record<string, ActivityLogGroupDTO>;
  communities: Record<string, ActivityLogCommunityDTO>;
}
