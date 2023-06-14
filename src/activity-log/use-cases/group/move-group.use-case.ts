import {
  ActivityLogBaseUseCase,
  BaseDataDTO,
  BasePayloadDTO,
} from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogGroupDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ChangeBaseDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';
import { GetPropsChanged } from '../../helpers';

type Moved = {
  outer: ChangeBaseDTO<ActivityLogGroupDTO>;
};
type MovedGroup = ActivityLogGroupDTO & { outer: ActivityLogGroupDTO };

type PayloadDTO = Omit<BasePayloadDTO<MovedGroup>, 'community'>;

type DataDTO = Omit<BaseDataDTO<ActivityLogGroupDTO>, 'community' | 'group'> & { changes: Moved };

export class MoveGroupLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.MOVE_GROUP;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
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
    const { actor, group, originalState, currentState } = data;

    return {
      useCase: this.useCase,
      eventTime,
      actorId: actor.id,
      communityId: group.communityId,
      eventType: this.eventType,
      objectType: this.objectType,
      objectId: group.id,
      groupId: group.id,
      data: {
        actor,
        object: originalState,
        changes: GetPropsChanged(originalState, currentState) as Moved,
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
