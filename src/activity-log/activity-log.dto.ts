import { EVENT_TYPES, OBJECT_TYPES } from '../activity-log.dto';

export abstract class ActivityLogBaseUseCase<T> {
  static readonly useCase: string;

  constructor(private readonly _document: ActivityLogDocumentDTO<T>) {}

  public get document() {
    return this._document;
  }

  public abstract toObjectIds(): ActivityLogObjectIdDTO;

  public abstract toData(objectData: ActivityLogObjectDataDTO): T;
}

export class ActivityLogPayloadDTO<TPayload> {
  useCase: string;
  eventTime: number;
  data: TPayload;
}

export class ActivityLogDocumentDTO<TData> {
  useCase: string;
  actorId: string;
  communityId: string;
  groupId?: string;
  eventTime: number;
  eventType: EVENT_TYPES;
  objectType: OBJECT_TYPES;
  objectId: string;
  data: TData;
}

export class ActivityLogObjectIdDTO {
  userIds?: string[];
  groupIds?: string[];
  communityIds?: string[];
}

export class ActivityLogObjectDataDTO {
  users: Record<string, ActivityLogUserDto>;
  groups: Record<string, ActivityLogGroupDto>;
  communities: Record<string, ActivityLogCommunityDto>;
}

export class ActivityLogUserDto {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
  isDeactivated: boolean;
}

export class ActivityLogCommunityDto {
  id: string;
  groupId: string;
  name: string;
  privacy: string;
  teamId: string;
}

export class ActivityLogGroupDto {
  id: string;
  name: string;
  level: number;
  privacy: string;
  chatId: string;
}
