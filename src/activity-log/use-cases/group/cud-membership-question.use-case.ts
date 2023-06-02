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
  ChangeBaseDTO,
} from '../../dtos';
import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

type QuestionStates = {
  question: string;
  isRequired: boolean;
};

type PayloadDTO = Pick<
  BasePayloadDTO<QuestionStates>,
  'actor' | 'group' | 'originalState' | 'currentState'
>;
type DataDTO = Pick<BaseDataDTO, 'actor' | 'group'> & {
  changes: { membershipQuestion: ChangeBaseDTO<QuestionStates> };
};

export class BaseMembershipQuestionLog extends ActivityLogBaseUseCase<DataDTO> {
  static readonly useCase:
    | ACTIVITY_LOG_USE_CASES.CREATE_MEMBERSHIP_QUESTION
    | ACTIVITY_LOG_USE_CASES.UPDATE_MEMBERSHIP_QUESTION
    | ACTIVITY_LOG_USE_CASES.DELETE_MEMBERSHIP_QUESTION;
  static readonly eventType:
    | ACTIVITY_EVENT_TYPES.CREATE
    | ACTIVITY_EVENT_TYPES.UPDATE
    | ACTIVITY_EVENT_TYPES.DELETE;
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
  ): ActivityLogDocumentDTO<DataDTO> {
    const { eventTime, requestId, data } = payload;
    const { actor, group } = data;

    return {
      eventTime,
      requestId,
      useCase: this.useCase,
      eventType: this.eventType,
      objectType: this.objectType,
      communityId: group.communityId,
      actorId: actor.id,
      objectId: group.id,
      groupId: group.id,
      data: {
        actor: { id: actor.id },
        group: data.group,
        changes: { membershipQuestion: { old: data.originalState, new: data.currentState } },
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

export class CreateMembershipQuestionLog extends BaseMembershipQuestionLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.CREATE_MEMBERSHIP_QUESTION;
  static readonly eventType = ACTIVITY_EVENT_TYPES.CREATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP;
}

export class UpdateMembershipQuestionLog extends BaseMembershipQuestionLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.UPDATE_MEMBERSHIP_QUESTION;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP;
}

export class DeleteMembershipQuestionLog extends BaseMembershipQuestionLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.DELETE_MEMBERSHIP_QUESTION;
  static readonly eventType = ACTIVITY_EVENT_TYPES.DELETE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP;
}
