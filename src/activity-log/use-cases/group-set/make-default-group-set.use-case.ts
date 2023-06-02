import { ACTIVITY_EVENT_TYPES, ACTIVITY_LOG_USE_CASES } from '../../enums';

import { CreateGroupSetLog } from './create-group-set.use-case';

export class MakeDefaultGroupSetLog extends CreateGroupSetLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.MAKE_DEFAULT_GROUP_SET;
  static readonly eventType = ACTIVITY_EVENT_TYPES.UPDATE;
}
