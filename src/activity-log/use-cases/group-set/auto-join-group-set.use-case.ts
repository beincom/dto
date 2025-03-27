import { ActivityLogBaseUseCase, BasePayloadPropsDTO } from "../../activity-log-base-use-case.dto";
import { ActivityLogAutoJoinGroupSetDTO, ActivityLogCommunityDTO, ActivityLogDocumentDTO, ActivityLogGroupSetDTO, ActivityLogObjectDataDTO, ActivityLogObjectIdDTO, ActivityLogPayloadDTO, ActivityLogUserDTO } from "../../dtos";
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from "../../enums";

class PayloadDTO extends BasePayloadPropsDTO {
  autoJoinGroupSet: ActivityLogAutoJoinGroupSetDTO
}

class DataDTO {
  actor: Partial<ActivityLogUserDTO>;
  groupSet: Partial<ActivityLogGroupSetDTO>;
  user: Partial<ActivityLogUserDTO>;
}

export class AutoJoinGroupSetLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase: ACTIVITY_LOG_USE_CASES.AUTO_JOIN_GROUP_SET;
  static readonly eventType = ACTIVITY_EVENT_TYPES.CREATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.MEMBER;

  public static toPayload(data: PayloadDTO): ActivityLogPayloadDTO<PayloadDTO> {
    return {
      useCase: this.useCase,
      eventTime: Date.now(),
      data,
    }
  }

  public static toDocument({
    eventTime,
    data
  }: ActivityLogPayloadDTO<PayloadDTO>): ActivityLogDocumentDTO<DataDTO> {
    const { id, mainId, actor, autoJoinGroupSet } = data;

    return {
      id,
      mainId,
      eventTime,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      actorId: actor ? actor.id : undefined,
      communityId: autoJoinGroupSet.communityId,
      objectId: autoJoinGroupSet.userId,
      data: {
        actor: actor ? { id: actor.id } : null,
        groupSet: { id: autoJoinGroupSet.groupSetId },
        user:  { id: autoJoinGroupSet.userId },
      }
    }
  }

  public toObjectIds(): ActivityLogObjectIdDTO {
    const { actorId, data } = this.document;

    return {
      userIds: [ actorId, data.user.id ],
      groupSetIds: [ data.groupSet.id ]
    };
  }

  public toData(objectData: ActivityLogObjectDataDTO): DataDTO {
    const { actorId, data } = this.document;

    return {
      actor: objectData.users[actorId],
      groupSet: objectData.groupSets[data.groupSet.id],
      user: objectData.users[data.user.id]
    };
  }
}