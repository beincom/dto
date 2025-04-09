import {
  ActivityLogBaseUseCase,
  BasePayloadPropsDTO,
} from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogGroupDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityLogUserDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

export enum DeletedState {
  DELETED = 'deleted',
  RESTORED = 'recoverd',
  TEMPORARY_DELETED = 'temporary-deleted',
}

export type DeleteRecoverGroupState = {
  group: ActivityLogGroupDTO;
  state: DeletedState;
};

type PayloadDTO = BasePayloadPropsDTO & DeleteRecoverGroupState;

type DataDTO = {actor: ActivityLogUserDTO} & DeleteRecoverGroupState;

class DeleteRecoverGroupLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase: 
    | ACTIVITY_LOG_USE_CASES.DELETE_GROUP
    | ACTIVITY_LOG_USE_CASES.RECOVER_GROUP
     = ACTIVITY_LOG_USE_CASES.DELETE_GROUP;
  static readonly eventType: ACTIVITY_EVENT_TYPES.DELETE | ACTIVITY_EVENT_TYPES.UPDATE = ACTIVITY_EVENT_TYPES.DELETE;
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
    const { id, mainId, actor, group, state } = data;

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
        actor,
        group,
        state
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

export class DeleteGroupLog extends DeleteRecoverGroupLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.DELETE_GROUP;
  static readonly eventType = ACTIVITY_EVENT_TYPES.DELETE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP;
}

export class RecoverGroupLog extends DeleteRecoverGroupLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.RECOVER_GROUP;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP;
}

