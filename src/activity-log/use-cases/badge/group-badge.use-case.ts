import {
  ActivityLogBaseUseCase,
  BaseDataDTO,
  BasePayloadDTO,
} from '../../activity-log-base-use-case.dto';
import {
  ActivityLogBadgeDTO,
  ActivityLogDocumentDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityPropChangedDTO,
  ChangeBaseDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';
import { GetPropsChanged } from '../../helpers';

class BadgeChanges extends ActivityPropChangedDTO {
  name: ChangeBaseDTO<string>;
  iconUrl: ChangeBaseDTO<string>;
  assignedTo: ChangeBaseDTO<string>;
}

class DataDTO extends BaseDataDTO<ActivityLogBadgeDTO> {
  changes: BadgeChanges;
}

class PayloadDTO extends BasePayloadDTO<ActivityLogBadgeDTO> {}

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
  }: ActivityLogPayloadDTO<PayloadDTO>): ActivityLogDocumentDTO<BaseDataDTO> {
    const { actor, community, group, originalState, currentState } = data;

    return {
      useCase: this.useCase,
      eventTime,
      actorId: actor.id,
      communityId: community.id,
      eventType: this.eventType,
      objectType: this.objectType,
      objectId: currentState.id ?? originalState.id,
      data: {
        actor,
        group,
        community,
        object: currentState,
        changes: GetPropsChanged(originalState, currentState),
      },
    };
  }

  public toObjectIds(): ActivityLogObjectIdDTO {
    return {
      userIds: [this.document.actorId],
      badgeIds: [this.document.objectId],
      groupIds: [this.document.groupId],
      communityIds: [this.document.communityId],
    };
  }

  public toData(objectData: Partial<ActivityLogObjectDataDTO>): DataDTO {
    const { actorId, data, objectId, communityId } = this.document;

    return {
      ...data,
      actor: objectData.users?.[actorId],
      object: objectData.badges?.[objectId],
      community: objectData.communities?.[communityId],
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
