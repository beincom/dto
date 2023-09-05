import { ActivityLogBaseUseCase, BasePayloadPropsDTO } from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogGroupDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityLogUserDTO,
  ActivityPropChangedDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';
import { GetPropsChanged } from '../../helpers';

import { GroupSettingsState } from './update-group-settings.use-case';

export type GroupProfileState = Partial<{
  name: string;
  description: string;
  privacy: string;
  backgroundImgUrl: string;
  icon: string;
}>;

class PayloadDTO extends BasePayloadPropsDTO {
  group: ActivityLogGroupDTO;
  originalState: GroupProfileState;
  currentState: GroupProfileState;
}

class DataDTO {
  actor: Partial<ActivityLogUserDTO>;
  group: Partial<ActivityLogGroupDTO>;
  changes: ActivityPropChangedDTO<GroupProfileState & { settings?: GroupSettingsState }>;
}

export class UpdateGroupProfileLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.UPDATE_GROUP_PROFILE;
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
    const { id, mainId, actor, group } = data;

    return {
      id,
      mainId,
      eventTime,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      actorId: actor.id,
      communityId: group.communityId,
      objectId: group.id,
      groupId: group.id,
      data: {
        actor: { id: actor.id },
        group: data.group,
        changes: GetPropsChanged(data.originalState, data.currentState),
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
      changes: data.changes || {},
      group: data.group || {
        // to be compatible with old data having "snapshot" instead of "group"
        id: data['snapshot']['id'],
        communityId: data['snapshot']['communityId'],
        name: data['snapshot']['name'],
        level: data['snapshot']['level'],
        privacy: data['snapshot']['privacy'],
      },
    };
  }
}
