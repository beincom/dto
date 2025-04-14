import {
    ActivityLogBaseUseCase,
    BasePayloadPropsDTO,
  } from '../../activity-log-base-use-case.dto';
  import {
    ActivityLogCommunityDTO,
    ActivityLogDocumentDTO,
    ActivityLogObjectDataDTO,
    ActivityLogObjectIdDTO,
    ActivityLogPayloadDTO,
    ActivityLogUserDTO,
  } from '../../dtos';
  import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';
  
export enum DeletedCommunityState {
  RESTORED = 'recoverd',
  TEMPORARY_DELETED = 'temporary-deleted',
}

  export type DeleteRecoverCommunityPayload = {
    community: ActivityLogCommunityDTO;
    state: DeletedCommunityState;
  };
  
  type PayloadDTO = BasePayloadPropsDTO & DeleteRecoverCommunityPayload;
  
  type DataDTO = {actor: ActivityLogUserDTO} & DeleteRecoverCommunityPayload;
  
  class DeleteRecoverCommunityLog extends ActivityLogBaseUseCase<DataDTO> {
    static readonly useCase: 
      | ACTIVITY_LOG_USE_CASES.DELETE_COMMUNITY
      | ACTIVITY_LOG_USE_CASES.RECOVER_COMMUNITY
       = ACTIVITY_LOG_USE_CASES.DELETE_COMMUNITY;
    static readonly eventType: ACTIVITY_EVENT_TYPES.DELETE | ACTIVITY_EVENT_TYPES.UPDATE = ACTIVITY_EVENT_TYPES.DELETE;
    static readonly objectType = ACTIVITY_OBJECT_TYPES.COMMUNITY;
  
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
      const { id, mainId, actor, community, state } = data;
  
      return {
        id,
        mainId,
        eventTime,
        useCase: this.useCase,
        eventType: this.eventType,
        objectType: this.objectType,
        actorId: actor ? actor.id : undefined,
        communityId: community.id,
        objectId: community.id,
        groupId: community.id,
        data: {
          actor,
          community,
          state
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
  
  export class DeleteCommunityLog extends DeleteRecoverCommunityLog {
    static readonly useCase = ACTIVITY_LOG_USE_CASES.DELETE_COMMUNITY;
    static readonly eventType = ACTIVITY_EVENT_TYPES.DELETE;
    static readonly objectType = ACTIVITY_OBJECT_TYPES.COMMUNITY;
  }
  
  export class RecoverCommunityLog extends DeleteRecoverCommunityLog {
    static readonly useCase = ACTIVITY_LOG_USE_CASES.RECOVER_COMMUNITY;
    static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
    static readonly objectType = ACTIVITY_OBJECT_TYPES.COMMUNITY;
  }
  
  