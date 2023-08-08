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

export type ArchiveUnArchiveGroupState = {
  archivedStatus: boolean;
};

type PayloadDTO = Pick<
  BasePayloadDTO<ArchiveUnArchiveGroupState>,
  'actor' | 'group' | 'originalState' | 'currentState'
>[];
type DataDTO = Pick<BaseDataDTO<ActivityLogGroupDTO>, 'actor' | 'group' | 'object'> & {
  changes: {
    archivedStatus?: ChangeBaseDTO<ArchiveUnArchiveGroupState['archivedStatus']>;
  };
};

export class ArchiveUnarchiveGroupLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.ARCHIVE_UNARCHIVE_GROUP;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
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
  ): ActivityLogDocumentDTO<DataDTO>[] {
    const { eventTime, requestId, data } = payload;

    return data.map(({ actor, group, originalState, currentState }) => ({
      useCase: this.useCase,
      eventTime,
      requestId,
      actorId: actor.id,
      communityId: group.communityId,
      eventType: this.eventType,
      objectType: this.objectType,
      objectId: group.id,
      groupId: group.id,
      data: {
        actor,
        group,
        object: group,
        changes: GetPropsChanged(originalState, currentState),
      },
    }));
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