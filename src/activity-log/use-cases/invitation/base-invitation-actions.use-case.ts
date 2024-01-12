import { INVITATION_TARGET, INVITATION_TYPE } from '../../../invitation.dto';
import { ActivityLogBaseUseCase, BasePayloadPropsDTO } from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogGroupDTO,
  ActivityLogGroupSetDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityLogUserDTO,
  InvitationLogDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

type PayloadDTO = BasePayloadPropsDTO & {
  invitation: InvitationLogDTO;
  group: ActivityLogGroupDTO;
  groupSet: ActivityLogGroupSetDTO;
};

type DataDTO = {
  actor?: Partial<ActivityLogUserDTO>;
  invitation: InvitationLogDTO;
  inviter?: Partial<ActivityLogUserDTO>;
  invitee?: Partial<ActivityLogUserDTO & { email: string }>;
  group: ActivityLogGroupDTO;
  groupSet: ActivityLogGroupSetDTO;
};

export class BaseInvitationActionLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase: ACTIVITY_LOG_USE_CASES;
  static readonly eventType: ACTIVITY_EVENT_TYPES;
  static readonly objectType: ACTIVITY_OBJECT_TYPES = ACTIVITY_OBJECT_TYPES.MEMBER;

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
    const { id, mainId, actor, invitation } = data;

    const isGroupType = data.invitation.targetType === INVITATION_TARGET.GROUP;

    return {
      id,
      mainId,
      eventTime,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      actorId: actor ? actor.id : undefined,
      communityId: invitation.communityId,
      groupId: isGroupType ? invitation.targetId : undefined,
      objectId: invitation.inviteeId,
      data: {
        actor,
        invitation,
        group: data.group,
        groupSet: data.groupSet,
      },
    };
  }

  public toObjectIds(): ActivityLogObjectIdDTO {
    const { actorId, data, groupId } = this.document;
    const targetId = data.invitation.targetId;
    return {
      userIds: [actorId, data.invitation.inviterId, data.invitation.inviteeId].filter((id) => id),
      groupIds: groupId ? [groupId] : [],
      groupSetIds:
        data.invitation.targetType === INVITATION_TARGET.GROUP_SET ? [targetId] : undefined,
    };
  }

  public toData(objectData: ActivityLogObjectDataDTO): DataDTO {
    const { actorId, data } = this.document;
    const isGroupType = data.invitation.targetType === INVITATION_TARGET.GROUP;
    const bindingTarget = {} as Pick<DataDTO, 'group' | 'groupSet'>;

    if (isGroupType) {
      bindingTarget.group = data.group || objectData.groups[data.invitation.targetId];
    } else {
      bindingTarget.groupSet = data.groupSet || objectData.groupSets[data.invitation.targetId];
    }

    return {
      ...data,
      ...bindingTarget,
      actor: objectData.users[actorId],
      inviter: objectData.users[data.invitation.inviterId],
      invitee:
        data.invitation.type === INVITATION_TYPE.EMAIL
          ? { email: data.invitation.email }
          : objectData.users[data.invitation.inviteeId],
    };
  }
}
