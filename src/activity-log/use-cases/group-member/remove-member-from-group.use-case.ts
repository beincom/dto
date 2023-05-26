import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES } from '../../enums';

import { AddMemberToGroupLog } from './add-member-to-group.use-case';

export class RemoveMemberFromGroupLog extends AddMemberToGroupLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.REMOVE_MEMBER;
  static readonly eventType = ACTIVITY_EVENT_TYPES.DELETE;
}
