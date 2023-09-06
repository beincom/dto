import { ActivityLogBaseUseCase, BasePayloadPropsDTO } from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogGroupDTO,
  ActivityLogGroupSetDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityLogUserDTO,
  ActivityPropChangedDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';
import { GetPropsChanged } from '../../helpers';

class PayloadDTO extends BasePayloadPropsDTO {
  originalState: ActivityLogGroupSetDTO;
  currentState: ActivityLogGroupSetDTO;
}

class DataDTO {
  actor: Partial<ActivityLogUserDTO>;
  object: ActivityLogGroupSetDTO;
  changes: ActivityPropChangedDTO<Partial<ActivityLogGroupSetDTO>>;
  addedGroups: ActivityLogGroupDTO[];
  removedGroups: ActivityLogGroupDTO[];
}

export class UpdateGroupSetLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.UPDATE_GROUP_SET;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP_SET;

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
  }: ActivityLogPayloadDTO<PayloadDTO>): ActivityLogDocumentDTO<DataDTO> {
    const { id, mainId, actor, originalState, currentState } = data;

    const groupsInOriginalState = originalState.groups || [];
    const groupsInCurrentState = currentState.groups || [];

    const combinedGroupsMap = new Map<string, ActivityLogGroupDTO>(
      [...groupsInOriginalState, ...groupsInCurrentState].map((group) => [group.id, group]),
    );
    const combinedGroupIds = [...combinedGroupsMap.keys()];

    const groupIdsInOriginalState = groupsInOriginalState.map((group) => group.id);
    const groupIdsInCurrentState = groupsInCurrentState.map((group) => group.id);
    const addedGroups = combinedGroupIds
      .filter((groupId) => !groupIdsInOriginalState.includes(groupId))
      .map((groupId) => combinedGroupsMap.get(groupId));
    const removedGroups = combinedGroupIds
      .filter((groupId) => !groupIdsInCurrentState.includes(groupId))
      .map((groupId) => combinedGroupsMap.get(groupId));

    return {
      id,
      mainId,
      eventTime,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      actorId: actor ? actor.id : undefined,
      communityId: currentState.communityId,
      objectId: currentState.id,
      data: {
        actor: actor ? { id: actor.id } : null,
        object: currentState,
        changes: GetPropsChanged(originalState, currentState),
        addedGroups,
        removedGroups,
      },
    };
  }

  public toObjectIds(): ActivityLogObjectIdDTO {
    const { actorId } = this.document;

    return {
      userIds: [actorId].filter((id) => id),
    };
  }

  public toData(objectData: ActivityLogObjectDataDTO): DataDTO {
    const { actorId, data } = this.document;

    return {
      ...data,
      actor: objectData.users[actorId],
    };
  }
}
