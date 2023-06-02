import {
  ActivityLogBaseUseCase,
  BaseDataDTO,
  BasePayloadDTO,
} from '../../activity-log-base-use-case.dto';
import {
  ActivityLogBadgeDTO,
  ActivityLogDocumentDTO,
  ActivityLogGroupDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityPropChangedDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';
import { GetPropsChanged } from '../../helpers';

export type BadgeLogDto = ActivityLogBadgeDTO & { assignedTo?: ActivityLogGroupDTO };
type BadgeChanges = ActivityPropChangedDTO<BadgeLogDto>;

type PayloadDTO = Omit<BasePayloadDTO<BadgeLogDto>, 'group' | 'community'>;

type DataDTO = Omit<BaseDataDTO<BadgeLogDto>, 'group' | 'community'> & {
  changes: BadgeChanges;
};

export class CreateBadgeLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase: ACTIVITY_LOG_USE_CASES = ACTIVITY_LOG_USE_CASES.CREATE_GROUP_BADGE;
  static readonly eventType: ACTIVITY_EVENT_TYPES = ACTIVITY_EVENT_TYPES.CREATE;
  static readonly objectType: ACTIVITY_OBJECT_TYPES = ACTIVITY_OBJECT_TYPES.GROUP_BADGE;

  public static toPayload(data: PayloadDTO): ActivityLogPayloadDTO<PayloadDTO> {
    return {
      useCase: this.useCase,
      eventTime: Date.now(),
      data,
    };
  }

  public static toDocument({
    eventTime,
    data,
    useCase,
  }: ActivityLogPayloadDTO<PayloadDTO>): ActivityLogDocumentDTO<DataDTO> {
    const { actor, originalState, currentState } = data;
    const isNotUpdate = [
      ACTIVITY_LOG_USE_CASES.CREATE_GROUP_BADGE,
      ACTIVITY_LOG_USE_CASES.DELETE_GROUP_BADGE,
    ].includes(useCase);
    const loggedBadge = originalState.id ? originalState : currentState;

    return {
      useCase: this.useCase,
      eventTime,
      actorId: actor.id,
      communityId: loggedBadge.communityId,
      eventType: this.eventType,
      objectType: this.objectType,
      objectId: currentState.id ?? originalState.id,
      data: {
        actor,
        object: loggedBadge,
        changes: isNotUpdate
          ? {}
          : (GetPropsChanged(originalState, currentState) as unknown as BadgeChanges),
      },
    };
  }

  public toObjectIds(): ActivityLogObjectIdDTO {
    return {
      userIds: [this.document.actorId],
      badgeIds: [this.document.objectId],
    };
  }

  public toData(
    objectData: Partial<ActivityLogObjectDataDTO>,
  ): DataDTO & { badge: ActivityLogBadgeDTO } {
    const { actorId, data, objectId } = this.document;

    return {
      ...data,
      actor: objectData.users[actorId],
      badge: objectData.badges[objectId],
    };
  }
}

export class UpdateBadgeLog extends CreateBadgeLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.UPDATE_GROUP_BADGE;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP_BADGE;
}

export class DeleteBadgeLog extends CreateBadgeLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.DELETE_GROUP_BADGE;
  static readonly eventType = ACTIVITY_EVENT_TYPES.DELETE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP_BADGE;
}

export class AssignBadgeLog extends CreateBadgeLog {
  static readonly useCase:
    | ACTIVITY_LOG_USE_CASES.ASSIGN_GROUP_BADGE
    | ACTIVITY_LOG_USE_CASES.UNASSIGN_GROUP_BADGE = ACTIVITY_LOG_USE_CASES.ASSIGN_GROUP_BADGE;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP_BADGE;
}

export class UnassignBadgeLog extends AssignBadgeLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.UNASSIGN_GROUP_BADGE;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP_BADGE;
}
