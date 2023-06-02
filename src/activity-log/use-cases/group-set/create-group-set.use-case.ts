import { ActivityLogBaseUseCase, BaseDataDTO } from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogGroupSetDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

type PayloadDTO = Pick<BaseDataDTO<ActivityLogGroupSetDTO>, 'actor' | 'object'>;

type DataDTO = Pick<BaseDataDTO<ActivityLogGroupSetDTO>, 'actor' | 'object'>;

export class CreateGroupSetLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase:
    | ACTIVITY_LOG_USE_CASES.CREATE_GROUP_SET
    | ACTIVITY_LOG_USE_CASES.DELETE_GROUP_SET
    | ACTIVITY_LOG_USE_CASES.MAKE_DEFAULT_GROUP_SET
    | ACTIVITY_LOG_USE_CASES.REMOVE_DEFAULT_GROUP_SET = ACTIVITY_LOG_USE_CASES.CREATE_GROUP_SET;
  static readonly eventType:
    | ACTIVITY_EVENT_TYPES.CREATE
    | ACTIVITY_EVENT_TYPES.DELETE
    | ACTIVITY_EVENT_TYPES.UPDATE = ACTIVITY_EVENT_TYPES.CREATE;
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
    requestId,
    data,
  }: ActivityLogPayloadDTO<PayloadDTO>): ActivityLogDocumentDTO<DataDTO> {
    const { actor, object } = data;

    return {
      eventTime,
      requestId,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      communityId: object.communityId,
      actorId: actor.id,
      objectId: object.id,
      data: {
        actor: { id: actor.id },
        object,
      },
    };
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
