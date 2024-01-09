import { ActivityLogBaseUseCase, BasePayloadPropsDTO } from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogGroupDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityLogUserDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

class PayloadDTO extends BasePayloadPropsDTO {
  group: ActivityLogGroupDTO & { categories?: string[] };
}

class DataDTO {
  actor: Partial<ActivityLogUserDTO>;
  group: Partial<ActivityLogGroupDTO>;
}

export class CreateGroupLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.CREATE_GROUP;
  static readonly eventType = ACTIVITY_EVENT_TYPES.CREATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP;

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
    const { id, mainId, actor, group } = data;

    return {
      id,
      mainId,
      eventTime,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      actorId: actor ? actor.id : undefined,
      communityId: group.communityId,
      objectId: group.id,
      groupId: group.id,
      data: {
        actor: actor ? { id: actor.id } : null,
        group: data.group,
      },
    };
  }

  public toObjectIds(): ActivityLogObjectIdDTO {
    const { actorId, objectId, communityId } = this.document;

    return {
      userIds: [actorId].filter((id) => id),
      groupIds: [objectId],
      communityIds: [communityId],
    };
  }

  public toData(objectData: ActivityLogObjectDataDTO): DataDTO {
    const { actorId, data } = this.document;

    return {
      ...data,
      actor: objectData.users[actorId],
      group: data.group,
    };
  }
}
