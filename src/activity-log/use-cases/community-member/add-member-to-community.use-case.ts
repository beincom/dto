import { ActivityLogBaseUseCase } from '../../activity-log-base-use-case.dto';
import {
  ActivityLogCommunityDTO,
  ActivityLogDocumentDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityLogUserDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

class PayloadDTO {
  actor: ActivityLogUserDTO;
  users: ActivityLogUserDTO[];
  community: ActivityLogCommunityDTO;
}

class DataDTO {
  actor: Partial<ActivityLogUserDTO>;
  user: Partial<ActivityLogUserDTO>;
  community: Partial<ActivityLogCommunityDTO>;
}

export class AddMemberToCommunityLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.ADD_MEMBER_TO_COMMUNITY;
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
    const { actor, users, community } = data;

    return users.map((user) => ({
      eventTime,
      requestId,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      communityId: community.id,
      actorId: actor.id,
      objectId: user.id,
      data: {
        actor: { id: actor.id },
        user: { id: user.id },
        community,
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
