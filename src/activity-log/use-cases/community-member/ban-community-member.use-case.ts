import { ActivityLogBaseUseCase, BasePayloadPropsDTO } from "../../activity-log-base-use-case.dto";
import { ActivityLogBannedCommunityMemberDTO, ActivityLogCommunityDTO, ActivityLogDocumentDTO, ActivityLogObjectDataDTO, ActivityLogObjectIdDTO, ActivityLogPayloadDTO, ActivityLogUserDTO } from "../../dtos";
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from "../../enums";

class PayloadDTO extends BasePayloadPropsDTO {
  bannedCommunityMember: ActivityLogBannedCommunityMemberDTO
}

class DataDTO {
  actor: Partial<ActivityLogUserDTO>;
  community: Partial<ActivityLogCommunityDTO>;
  bannedUser: Partial<ActivityLogUserDTO>;
}

export class BanCommunityMemberLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase: ACTIVITY_LOG_USE_CASES.BAN_MEMBER | ACTIVITY_LOG_USE_CASES.UNBAN_MEMBER = ACTIVITY_LOG_USE_CASES.BAN_MEMBER;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.MEMBER;

  public static toPayload(data: PayloadDTO): ActivityLogPayloadDTO<PayloadDTO> {
    return {
      useCase: this.useCase,
      eventTime: Date.now(),
      data,
    }
  }

  public static toDocument({
    eventTime,
    data
  }: ActivityLogPayloadDTO<PayloadDTO>): ActivityLogDocumentDTO<DataDTO> {
    const { id, mainId, actor, bannedCommunityMember } = data;

    return {
      id,
      mainId,
      eventTime,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      actorId: actor ? actor.id : undefined,
      communityId: bannedCommunityMember.communityId,
      objectId: bannedCommunityMember.userId,
      data: {
        actor: actor ? { id: actor.id } : null,
        community: { id: bannedCommunityMember.communityId },
        bannedUser:  { id: bannedCommunityMember.userId },
      }
    }
  }

  public toObjectIds(): ActivityLogObjectIdDTO {
    const { actorId, data } = this.document;

    return {
      userIds: [ actorId, data.bannedUser.id ],
      communityIds: [ data.community.id ]
    };
  }

  public toData(objectData: ActivityLogObjectDataDTO): DataDTO {
    const { actorId, data } = this.document;

    return {
      actor: objectData.users[actorId],
      community: objectData.communities[data.community.id],
      bannedUser: objectData.users[data.bannedUser.id]
    };
  }
}