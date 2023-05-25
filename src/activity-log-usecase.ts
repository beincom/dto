/**
 * @deprecated
 */
export enum ACTIVITY_LOG_USECASES {
  UPDATE_GROUP_PROFILE = 'update.group.profile',
  ADD_MEMBER_TO_COMMUNITY = 'add.member.to_community',
  ADD_MEMBER_TO_GROUP = 'add.member.to_group',
  APPROVE_JOIN_REQUEST = 'approve.join_request',
  DECLINE_JOIN_REQUEST = 'decline.join_request',
  JOIN_COMMUNITY_AS_MEMBER = 'join.community.as_member',
  JOIN_GROUP_AS_MEMBER = 'join.group.as_member',
  JOIN_GROUP_AS_ADMIN = 'join.group.as_admin',
  REMOVE_MEMBER = 'remove.member',
  LEAVE_GROUP = 'leave.group',
  ASSIGN_GROUP_ADMIN = 'assign.group_admin',
  REVOKE_GROUP_ADMIN = 'revoke.group_admin',
  ASSIGN_COMMUNITY_ADMIN = 'assign.community_admin',
  REVOKE_COMMUNITY_ADMIN = 'revoke.community_admin',
}
