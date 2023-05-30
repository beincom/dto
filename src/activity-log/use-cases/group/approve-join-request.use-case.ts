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
import { AddMemberToGroupLog } from '../group-member';

class PayloadDTO {
  actor: ActivityLogUserDTO;
  users: ActivityLogUserDTO[];
  groups: ActivityLogGroupDTO[];
  outerGroups: ActivityLogGroupDTO[];
}

class DataDTO {
  actor: Partial<ActivityLogUserDTO>;
  user: Partial<ActivityLogUserDTO>;
  group: Partial<ActivityLogGroupDTO>;
}

export class ApproveJoinRequestLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.APPROVE_JOIN_REQUEST;
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
    const { actor, users, groups, outerGroups } = data;

    const documents: ActivityLogDocumentDTO<DataDTO>[] = [];

    for (const user of users) {
      for (const group of groups) {
        documents.push({
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
        });
      }
    }

    if (outerGroups.length > 0) {
      const addMemberToGroupPayload = AddMemberToGroupLog.toPayload({
        actor,
        users,
        groups: outerGroups,
      });
      const addMemberToGroupDocuments = AddMemberToGroupLog.toDocument(addMemberToGroupPayload);

      documents.push(...addMemberToGroupDocuments);
    }

    return documents;
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
