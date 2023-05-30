import { ACTIVITY_EVENT_TYPES, ACTIVITY_OBJECT_TYPES } from '../enums';

import {
  ActivityLogCommunityDTO,
  ActivityLogGroupDTO,
  ActivityLogUserDTO,
} from './activity-log-use-case.dto';

/**
 * For the producer
 * Represents a payload for an activity log.
 * @template TPayload - The type of data contained in the payload.
 */
export class ActivityLogPayloadDTO<TPayload> {
  useCase: string;
  eventTime: number;
  requestId?: string;
  data: TPayload;
}

/**
 * For the consumer
 * Represents a document for an activity log.
 * @template TData - The type of data contained in the document.
 */
export class ActivityLogDocumentDTO<TData> {
  useCase: string;
  eventTime: number;
  requestId?: string;
  rootUseCase?: string;
  actorId: string;
  communityId: string;
  groupId?: string;
  eventType: ACTIVITY_EVENT_TYPES;
  objectType: ACTIVITY_OBJECT_TYPES;
  objectId: string;
  data: TData;
}

/**
 * For data fetching
 * Collect all object ids from the activity log document.
 */
export class ActivityLogObjectIdDTO {
  userIds?: string[];
  groupIds?: string[];
  communityIds?: string[];
}

/**
 * For data fetching
 * Aggregate all object data from the object ids to bind data to the activity log documents.
 */
export class ActivityLogObjectDataDTO {
  users: Record<string, ActivityLogUserDTO>;
  groups: Record<string, ActivityLogGroupDTO>;
  communities: Record<string, ActivityLogCommunityDTO>;
}
