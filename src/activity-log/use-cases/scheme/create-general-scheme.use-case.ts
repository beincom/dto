import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

import { BaseSchemeLog } from './base-scheme.use-case';

export class CreateGeneralSchemeLog extends BaseSchemeLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.CREATE_GENERAL_SCHEME;
  static readonly eventType = ACTIVITY_EVENT_TYPES.CREATE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GENERAL_SCHEME;
}
