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
  users: ActivityLogUserDTO[];
  group: ActivityLogGroupDTO;
}

class DataDTO {
  actor: Partial<ActivityLogUserDTO>;
  user: Partial<ActivityLogUserDTO>;
  group: Partial<ActivityLogGroupDTO>;
}

export class DeclineJoinRequestLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.DECLINE_JOIN_REQUEST;
  static readonly eventType = ACTIVITY_EVENT_TYPES.DELETE;
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
    const { actor, users, group } = data;

    return users.map((user) => ({
      eventTime,
      requestId,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      communityId: group.communityId,
      actorId: actor.id,
      objectId: user.id,
      groupId: group.id,
      data: {
        actor: { id: actor.id },
        user: { id: user.id },
        group,
      },
    }));
  }

  public toObjectIds(): ActivityLogObjectIdDTO {
    const { actorId, data } = this.document;

    return {
      userIds: [actorId, data.user.id],
    };
  }

  public toData(objectData: ActivityLogObjectDataDTO): DataDTO {
    const { actorId, data } = this.document;

    return {
      ...data,
      actor: objectData.users[actorId],
      user: objectData.users[data.user.id],
    };
  }
}
