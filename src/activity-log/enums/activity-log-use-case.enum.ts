export enum ACTIVITY_LOG_USE_CASES {
  /** Community **/

  /** Community Member **/
  JOIN_COMMUNITY_AS_MEMBER = 'join.community.as_member',
  ADD_MEMBER_TO_COMMUNITY = 'add.member.to_community',
  ASSIGN_COMMUNITY_ADMIN = 'assign.community_admin',
  REVOKE_COMMUNITY_ADMIN = 'revoke.community_admin',

  /** Group **/
  UPDATE_GROUP_PROFILE = 'update.group.profile',

  /** Group Member **/
  APPROVE_JOIN_REQUEST = 'approve.join_request',
  DECLINE_JOIN_REQUEST = 'decline.join_request',
  ADD_MEMBER_TO_GROUP = 'add.member.to_group',
  REMOVE_MEMBER = 'remove.member',
  JOIN_GROUP_AS_MEMBER = 'join.group.as_member',
  JOIN_GROUP_AS_ADMIN = 'join.group.as_admin',
  LEAVE_GROUP = 'leave.group',
  ASSIGN_GROUP_ADMIN = 'assign.group_admin',
  REVOKE_GROUP_ADMIN = 'revoke.group_admin',
}
