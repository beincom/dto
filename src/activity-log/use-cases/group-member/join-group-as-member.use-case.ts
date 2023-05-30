import { ActivityLogBaseUseCase } from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogGroupDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityLogUserDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

class PayloadDTO {
  actor: ActivityLogUserDTO;
  groups: ActivityLogGroupDTO[];
}

class DataDTO {
  actor: Partial<ActivityLogUserDTO>;
  group: Partial<ActivityLogGroupDTO>;
}

export class JoinGroupAsMemberLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase:
    | ACTIVITY_LOG_USE_CASES.JOIN_GROUP_AS_MEMBER
    | ACTIVITY_LOG_USE_CASES.JOIN_GROUP_AS_ADMIN = ACTIVITY_LOG_USE_CASES.JOIN_GROUP_AS_MEMBER;
  static readonly eventType = ACTIVITY_EVENT_TYPES.CREATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.MEMBER;

  public static toPayload(data: PayloadDTO): ActivityLogPayloadDTO<PayloadDTO> {
    return {
      useCase: this.useCase,
      eventTime: Date.now(),
      data,
    };
  }

  public static toDocument({
    eventTime,
    requestId,
    data,
  }: ActivityLogPayloadDTO<PayloadDTO>): ActivityLogDocumentDTO<DataDTO>[] {
    const { actor, groups } = data;

    return groups.map((group) => ({
      eventTime,
      requestId,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      communityId: group.communityId,
      actorId: actor.id,
      objectId: actor.id,
      groupId: group.id,
      data: {
        actor: { id: actor.id },
        group,
      },
    }));
  }

  public toObjectIds(): ActivityLogObjectIdDTO {
    const { actorId } = this.document;

    return {
      userIds: [actorId],
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
