import { ActivityLogBaseUseCase } from '../../activity-log-base-use-case.dto';
import {
  ActivityLogDocumentDTO,
  ActivityLogGroupDTO,
  ActivityLogObjectDataDTO,
  ActivityLogObjectIdDTO,
  ActivityLogPayloadDTO,
  ActivityLogUserDTO,
  InvitationLogDTO,
} from '../../dtos';
import {
  ACTIVITY_EVENT_TYPES,
  ACTIVITY_LOG_USE_CASES,
  ACTIVITY_OBJECT_TYPES,
  INVITATION_TARGET,
} from '../../enums';

type PayloadDTO = {
  actor: ActivityLogUserDTO;
  invitations: InvitationLogDTO[];
};

type DataDTO = {
  actor: Partial<ActivityLogUserDTO>;
  invitation: InvitationLogDTO;
  inviter?: Partial<ActivityLogUserDTO>;
  invitee?: Partial<ActivityLogUserDTO>;
  group?: ActivityLogGroupDTO;
};

export class CreateInvitationLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase: ACTIVITY_LOG_USE_CASES = ACTIVITY_LOG_USE_CASES.CREATE_INVITATION;
  static readonly eventType: ACTIVITY_EVENT_TYPES = ACTIVITY_EVENT_TYPES.CREATE;
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
  }: ActivityLogPayloadDTO<PayloadDTO>): ActivityLogDocumentDTO<DataDTO>[] {
    const { actor, invitations } = data;

    return invitations.map((invitation) => {
      const isGroupType = invitation.targetType === INVITATION_TARGET.GROUP;

      return {
        useCase: this.useCase,
        eventTime,
        actorId: actor.id,
        communityId: invitation.communityId,
        groupId: isGroupType ? invitation.targetId : undefined,
        eventType: this.eventType,
        objectType: this.objectType,
        objectId: invitation.inviteeId,
        data: {
          actor,
          invitation,
        },
      };
    });
  }

  public toObjectIds(): ActivityLogObjectIdDTO {
    const { actorId, groupId, data } = this.document;

    return {
      userIds: [actorId, data.invitation.inviterId, data.invitation.inviteeId],
      groupIds: groupId ? [groupId] : [],
    };
  }

  public toData(objectData: ActivityLogObjectDataDTO): DataDTO {
    const { actorId, groupId, data } = this.document;

    return {
      ...data,
      actor: objectData.users[actorId],
      inviter: objectData.users[data.invitation.inviterId],
      invitee: objectData.users[data.invitation.inviteeId],
      group: objectData.groups[groupId],
    };
  }
}
