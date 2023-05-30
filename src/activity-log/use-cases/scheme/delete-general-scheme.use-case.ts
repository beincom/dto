import {
  ActivityLogBaseUseCase,
  BaseDataDTO,
  BasePayloadDTO,
} from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

type DeleteSchemeState = {
  id: string;
  name: string;
};
type PayloadDTO = Pick<BasePayloadDTO<DeleteSchemeState>, 'actor' | 'community' | 'originalState'>;
type DataDTO = Pick<BaseDataDTO, 'actor' | 'community'>;

export class DeleteGeneralSchemeLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase:
    | ACTIVITY_LOG_USE_CASES.DELETE_GENERAL_SCHEME
    | ACTIVITY_LOG_USE_CASES.DELETE_GROUP_SCHEME = ACTIVITY_LOG_USE_CASES.DELETE_GENERAL_SCHEME;
  static readonly eventType: ACTIVITY_EVENT_TYPES.DELETE;
  static readonly objectType:
    | ACTIVITY_OBJECT_TYPES.GENERAL_SCHEME
    | ACTIVITY_OBJECT_TYPES.GROUP_SCHEME = ACTIVITY_OBJECT_TYPES.GENERAL_SCHEME;

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
    const { eventTime, requestId, data } = payload;
    const { actor, community, originalState } = data;

    return {
      useCase: this.useCase,
      eventTime,
      requestId,
      actorId: actor.id,
      communityId: community.id,
      eventType: this.eventType,
      objectType: this.objectType,
      objectId: originalState.id,
      data: {
        actor,
        community,
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
