import { ACTIVITY_LOG_USE_CASES } from '../../enums';

import { JoinGroupAsMemberLog } from './join-group-as-member.use-case';

export class JoinGroupAsAdminLog extends JoinGroupAsMemberLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.JOIN_GROUP_AS_ADMIN;
}
