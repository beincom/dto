import { ROLE_TYPE } from '@beincom/constants';

import { ActivityLogBaseUseCase, BasePayloadPropsDTO } from '../../activity-log-base-use-case.dto';
import {
  ActivityLogCommunityDTO,
  ActivityLogDocumentDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityLogUserDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

class PayloadDTO extends BasePayloadPropsDTO {
  users: ActivityLogUserDTO[];
  community: ActivityLogCommunityDTO;
  originalState: ROLE_TYPE;
  currentState: ROLE_TYPE;
}

class DataDTO {
  actor: Partial<ActivityLogUserDTO>;
  user: Partial<ActivityLogUserDTO>;
  community: Partial<ActivityLogCommunityDTO>;
  changes: {
    old: ROLE_TYPE;
    new: ROLE_TYPE;
  };
}

export class AssignCommunityAdminsLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase:
    | ACTIVITY_LOG_USE_CASES.REVOKE_COMMUNITY_ADMIN
    | ACTIVITY_LOG_USE_CASES.ASSIGN_COMMUNITY_ADMIN = ACTIVITY_LOG_USE_CASES.ASSIGN_COMMUNITY_ADMIN;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
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
    data,
  }: ActivityLogPayloadDTO<PayloadDTO>): ActivityLogDocumentDTO<DataDTO>[] {
    const { id, mainId, actor, users, community } = data;

    return users.map((user) => ({
      id,
      mainId,
      eventTime,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      actorId: actor.id,
      communityId: community.id,
      objectId: user.id,
      data: {
        actor: { id: actor.id },
        user: { id: user.id },
        community,
        changes: {
          old: data.originalState,
          new: data.currentState,
        },
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
