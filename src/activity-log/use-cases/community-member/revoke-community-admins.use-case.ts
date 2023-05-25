import { ACTIVITY_LOG_USE_CASES } from '../../enums';

import { AssignCommunityAdminsLog } from './assign-community-admins.use-case';

export class RevokeCommunityAdminsLog extends AssignCommunityAdminsLog {
  static readonly useCase = ACTIVITY_LOG_USE_CASES.REVOKE_COMMUNITY_ADMIN;
}
