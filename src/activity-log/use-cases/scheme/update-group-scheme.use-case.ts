import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

import { BaseSchemeLog } from './base-scheme.use-case';

export class UpdateGroupSchemeLog extends BaseSchemeLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.UPDATE_GROUP_SCHEME;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP_SCHEME;
}
