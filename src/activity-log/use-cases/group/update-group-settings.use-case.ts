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

type SettingKey =
  | 'isJoinApproval'
  | 'isInvitedOnly'
  | 'isActiveGroupTerms'
  | 'isActiveMembershipQuestions';

export type GroupSettingsState = {
  [k in SettingKey]?: boolean;
};

class PayloadDTO extends BasePayloadPropsDTO {
  group: Group;
  originalState: GroupSettingsState;
  currentState: GroupSettingsState;
}

type Group = ActivityLogGroupDTO & { settings: GroupSettingsState };
class DataDTO {
  actor: Partial<ActivityLogUserDTO>;
  group: Partial<ActivityLogGroupDTO>;
  object: Group;
  changes: ActivityPropChangedDTO<GroupSettingsState>;
}

export class UpdateGroupSettingsLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.UPDATE_GROUP_SETTINGS;
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
    const groupLogDto = new ActivityLogGroupDTO(data.group);
    const groupWithSettings = { ...groupLogDto, settings: group.settings };

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
        group: groupLogDto,
        changes: GetPropsChanged(data.originalState, data.currentState),
        object: groupWithSettings,
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
      changes: data.changes || {},
      group: data.group || {
        id: data.object['id'],
        communityId: data.object['communityId'],
        name: data.object['name'],
        level: data.object['level'],
        privacy: data.object['privacy'],
      },
    };
  }
}
