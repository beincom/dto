import { ACTIVITY_LOG_USE_CASES } from '../../enums';

import { AssignGroupAdminLog } from './assign-group-admin.use-case';

export class RevokeGroupAdminLog extends AssignGroupAdminLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.REVOKE_GROUP_ADMIN;
}
