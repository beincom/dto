import {
  ActivityLogBaseUseCase,
  BaseDataDTO,
  BasePayloadDTO,
  BasePayloadPropsDTO,
} from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogGroupDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityLogSchemeDTO,
  ChangeBaseDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';
import { GetPropsChanged } from '../../helpers';

export type AssignSchemeState = ActivityLogSchemeDTO & {
  assigned: ActivityLogGroupDTO[];
};
type PayloadDTO = BasePayloadPropsDTO &
  Pick<BasePayloadDTO<AssignSchemeState>, 'actor' | 'community' | 'originalState' | 'currentState'>;

type DataDTO = Pick<BaseDataDTO<ActivityLogSchemeDTO>, 'actor' | 'community' | 'object'> & {
  changes: {
    assigned?: ChangeBaseDTO<AssignSchemeState['assigned']>;
  };
};

export class AssignGroupSchemeLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.ASSIGN_GROUP_SCHEME;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP_SCHEME;

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
    const { id, mainId, actor, community, originalState, currentState } = data;

    const { assigned: originalAssigned } = originalState;
    const { assigned: currentAssigned, ...restCurrentScheme } = currentState;

    return {
      id,
      mainId,
      eventTime,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      actorId: actor ? actor.id : undefined,
      communityId: community.id,
      objectId: restCurrentScheme.id,
      data: {
        actor,
        community,
        object: restCurrentScheme,
        changes: GetPropsChanged({ assigned: originalAssigned }, { assigned: currentAssigned }),
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
