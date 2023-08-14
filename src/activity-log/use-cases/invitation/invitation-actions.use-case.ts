import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES } from '../../enums';

import { BaseInvitationActionLog } from './base-invitation-actions.use-case';

export class CancelInvitationLog extends BaseInvitationActionLog {
  static readonly useCase: ACTIVITY_LOG_USE_CASES = ACTIVITY_LOG_USE_CASES.CANCEL_INVITATION;
  static readonly eventType: ACTIVITY_EVENT_TYPES = ACTIVITY_EVENT_TYPES.UPDATE;
}

export class AcceptInvitationLog extends BaseInvitationActionLog {
  static readonly useCase: ACTIVITY_LOG_USE_CASES = ACTIVITY_LOG_USE_CASES.ACCEPT_INVITATION;
  static readonly eventType: ACTIVITY_EVENT_TYPES = ACTIVITY_EVENT_TYPES.UPDATE;
}

export class DeclineInvitationLog extends BaseInvitationActionLog {
  static readonly useCase: ACTIVITY_LOG_USE_CASES = ACTIVITY_LOG_USE_CASES.DECLINE_INVITATION;
  static readonly eventType: ACTIVITY_EVENT_TYPES = ACTIVITY_EVENT_TYPES.UPDATE;
}
