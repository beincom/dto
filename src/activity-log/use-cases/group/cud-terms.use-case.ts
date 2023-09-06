import {
  ActivityLogBaseUseCase,
  BaseDataDTO,
  BasePayloadDTO,
  BasePayloadPropsDTO,
} from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ChangeBaseDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

type PayloadDTO = BasePayloadPropsDTO &
  Pick<BasePayloadDTO<string>, 'actor' | 'group' | 'originalState' | 'currentState'>;

type DataDTO = Pick<BaseDataDTO, 'actor' | 'group'> & { changes: { terms: ChangeBaseDTO<string> } };

export class BaseTermsLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase:
    | ACTIVITY_LOG_USE_CASES.CREATE_TERMS
    | ACTIVITY_LOG_USE_CASES.UPDATE_TERMS
    | ACTIVITY_LOG_USE_CASES.DELETE_TERMS;
  static readonly eventType:
    | ACTIVITY_EVENT_TYPES.CREATE
    | ACTIVITY_EVENT_TYPES.UPDATE
    | ACTIVITY_EVENT_TYPES.DELETE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP;

  public static toPayload(data: PayloadDTO): ActivityLogPayloadDTO<PayloadDTO> {
    return {
      useCase: this.useCase,
      eventTime: Date.now(),
      data,
    };
  }

  public static toDocument(
    payload: ActivityLogPayloadDTO<PayloadDTO>,
  ): ActivityLogDocumentDTO<DataDTO> {
    const { eventTime, data } = payload;
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
        changes: { terms: { old: data.originalState, new: data.currentState } },
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

export class CreateTermsLog extends BaseTermsLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.CREATE_TERMS;
  static readonly eventType = ACTIVITY_EVENT_TYPES.CREATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP;
}

export class UpdateTermsLog extends BaseTermsLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.UPDATE_TERMS;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP;
}

export class DeleteTermsLog extends BaseTermsLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.DELETE_TERMS;
  static readonly eventType = ACTIVITY_EVENT_TYPES.DELETE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP;
}
