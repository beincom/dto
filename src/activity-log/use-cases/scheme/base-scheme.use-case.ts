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
  ActivityLogSchemeDTO,
  ChangeBaseDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';
import { GetPropsChanged } from '../../helpers';

export type SchemeState = ActivityLogSchemeDTO & {
  roles: {
    name: string;
    permissions: {
      name: string;
      key: string;
    }[];
  }[];
};

type PayloadDTO = BasePayloadPropsDTO &
  Pick<BasePayloadDTO<SchemeState>, 'community' | 'originalState' | 'currentState'>;
type DataDTO = Pick<BaseDataDTO<ActivityLogSchemeDTO>, 'actor' | 'community' | 'object'> & {
  changes: {
    id?: ChangeBaseDTO<SchemeState['id']>;
    name?: ChangeBaseDTO<SchemeState['name']>;
    description?: ChangeBaseDTO<SchemeState['description']>;
    roles?: ChangeBaseDTO<SchemeState['roles']>;
  };
};

export class BaseSchemeLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase:
    | ACTIVITY_LOG_USE_CASES.CREATE_GENERAL_SCHEME
    | ACTIVITY_LOG_USE_CASES.UPDATE_GENERAL_SCHEME
    | ACTIVITY_LOG_USE_CASES.DELETE_GENERAL_SCHEME
    | ACTIVITY_LOG_USE_CASES.CREATE_GROUP_SCHEME
    | ACTIVITY_LOG_USE_CASES.UPDATE_GROUP_SCHEME
    | ACTIVITY_LOG_USE_CASES.DELETE_GROUP_SCHEME;
  static readonly eventType:
    | ACTIVITY_EVENT_TYPES.CREATE
    | ACTIVITY_EVENT_TYPES.UPDATE
    | ACTIVITY_EVENT_TYPES.DELETE;
  static readonly objectType:
    | ACTIVITY_OBJECT_TYPES.GENERAL_SCHEME
    | ACTIVITY_OBJECT_TYPES.GROUP_SCHEME;

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
    const { id, mainId, actor, community, originalState, currentState } = data;

    return {
      id,
      mainId,
      eventTime,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      actorId: actor.id,
      communityId: community.id,
      objectId: this.eventType === ACTIVITY_EVENT_TYPES.DELETE ? originalState.id : currentState.id,
      data: {
        actor,
        community,
        object: this.eventType === ACTIVITY_EVENT_TYPES.DELETE ? originalState : currentState,
        changes: GetPropsChanged(originalState, currentState),
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
