export enum ACTIVITY_LOG_USE_CASES {
  /**Member **/
  JOIN_COMMUNITY_AS_MEMBER = 'join.community.as_member', // TODO: requirement changed to root group, remove this
  ADD_MEMBER_TO_COMMUNITY = 'add.member.to_community', // TODO: requirement changed to root group, remove this

  ASSIGN_COMMUNITY_ADMIN = 'assign.community_admin',
  REVOKE_COMMUNITY_ADMIN = 'revoke.community_admin',
  ASSIGN_GROUP_ADMIN = 'assign.group_admin',
  REVOKE_GROUP_ADMIN = 'revoke.group_admin',
  JOIN_GROUP_AS_ADMIN = 'join.group.as_admin',
  JOIN_GROUP_AS_MEMBER = 'join.group.as_member',
  ADD_MEMBER_TO_GROUP = 'add.member.to_group',
  LEAVE_GROUP = 'leave.group',
  REMOVE_MEMBER = 'remove.member',
  APPROVE_JOIN_REQUEST = 'approve.join_request',
  DECLINE_JOIN_REQUEST = 'decline.join_request',

  /** Group **/
  UPDATE_GROUP_PROFILE = 'update.group.profile',
  ARCHIVE_UNARCHIVE_GROUP = 'archive-unarchive.group',

  /** Group terms **/
  CREATE_TERMS = 'create.group.terms',
  UPDATE_TERMS = 'update.group.terms',
  DELETE_TERMS = 'delete.group.terms',

  /** Scheme **/
  CREATE_GENERAL_SCHEME = 'create.general_scheme',
  UPDATE_GENERAL_SCHEME = 'update.general_scheme',
  DELETE_GENERAL_SCHEME = 'delete.general_scheme',
  CREATE_GROUP_SCHEME = 'create.group_scheme',
  UPDATE_GROUP_SCHEME = 'update.group_scheme',
  DELETE_GROUP_SCHEME = 'delete.group_scheme',
  ASSIGN_GROUP_SCHEME = 'assign.group_scheme',

  /** Badge **/
  CREATE_GROUP_BADGE = 'create.group_badge',
  UPDATE_GROUP_BADGE = 'update.group_badge',
  DELETE_GROUP_BADGE = 'delete.group_badge',
  ASSIGN_GROUP_BADGE = 'assign.group_badge',
  UNASSIGN_GROUP_BADGE = 'unassign.group_badge',
}
