import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES, ACTIVITY_OBJECT_TYPES } from '../../enums';

import { DeleteGeneralSchemeLog } from './delete-general-scheme.use-case';

export class DeleteGroupSchemeLog extends DeleteGeneralSchemeLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.DELETE_GROUP_SCHEME;
  static readonly eventType = ACTIVITY_EVENT_TYPES.DELETE;
  static readonly objectType = ACTIVITY_OBJECT_TYPES.GROUP_SCHEME;
}
