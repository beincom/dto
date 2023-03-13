import { ACTIVITY_LOG_USECASES } from './activity-log-usecase';

export enum EVENT_TYPES {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

/**
 * Entity types
 */
export enum OBJECT_TYPES {
  COMMUNITY = 'COMMUNITY',
  GROUP = 'GROUP',
  MEMBER = 'MEMBER',
  ARTICLE = 'ARTICLE',
  POST = 'POST',
  SERIES = 'SERIES',
}

export type UserLogDto = {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
};

export class PropsChanged {
  [propName: string]: { old: string | object; new: string | object };
}

/** Use for the kafka topic name */
export const ACTIVITY_LOG_EVENT = 'activity_log_created';

export type CommunityLogDto = {
  id: string;
  name: string;
  privacy: string;
  teamId: string;
};

export type GroupLogDto = {
  id: string;
  name: string;
  level: number;
  privacy: string;
  chatId: string;
};

export type GroupsObject = {
  groups: GroupLogDto[];
};

export type CommunityObject = {
  community: CommunityLogDto;
};

export type UsersWithCommunityData = {
  users: UserLogDto[];
  community: CommunityLogDto;
};

export type UsersWithGroupsData = {
  users: UserLogDto[];
  groups: GroupLogDto[];
};

export type UsersWithGroupData = {
  users: UserLogDto[];
  group: GroupLogDto;
};

export type JoinGroupAsAdminData = {
  groupsAsMember: GroupLogDto[];
  groupsAsAdmin: GroupLogDto[];
};

export type ApproveJoinRequestData = {
  users: UserLogDto[];
  targetGroups: GroupLogDto[];

  /**
   *  Can be [] when approving JR to join community
   */
  outerGroups: GroupLogDto[];
};

type StateChanged = {
  /** The original states of the object BEFORE making changes
   *
   *  Use for detect change logs when comparing to `{currentState}`
   *
   *  Can be `null` in cases of `CREATE`
   */
  originalState: string | object;

  /** The newest states of the object AFTER making changes
   *
   *  Use for detect change logs when comparing to `{originalState}`
   *
   *  Can be `null` in cases of `DELETE`
   */
  currentState: string | object;

  /**
   * OPTIONAL: The detail changes of the activity log event
   *
   * Only use this when producer-service cannot share the full states of the changed entity (`originalState`/`currentState`)
   */
  changes?: PropsChanged;
};

export type StateChangedOfGroup = StateChanged & {
  group: GroupLogDto;
};

export type GroupAdminStatusChangedData = StateChangedOfGroup & {
  users: UserLogDto[];
};

export type LogPayload<T> = {
  useCase: ACTIVITY_LOG_USECASES;
  actor: UserLogDto;
  communityId: string;
  eventTime: Date;
  data: T;
};

/**
 * The base DTO contract for activity log item.
 *
 * This object will be used by BIC-services to write activity log info to the log queue (KAFKA),
 * which will be consumed by activity-log-service afterwards
 */
export abstract class ActivityLogItem<T> {
  protected abstract readonly useCase: ACTIVITY_LOG_USECASES;
  private _eventTime = new Date();

  protected constructor(
    protected actor: UserLogDto,
    protected communityId: string,
    protected data: T,
  ) {}

  public toObject(): LogPayload<T> {
    return {
      useCase: this.useCase,
      actor: this.actor,
      communityId: this.communityId,
      eventTime: this._eventTime,
      data: this.data,
    };
  }

  public set eventTime(time: Date) {
    this._eventTime = time;
  }
}

export class AddMemberToCommunityUC extends ActivityLogItem<UsersWithCommunityData> {
  readonly useCase = ACTIVITY_LOG_USECASES.ADD_MEMBER_TO_COMMUNITY;

  constructor(actor: UserLogDto, communityId: string, props: UsersWithCommunityData) {
    super(actor, communityId, props);
  }
}

export class AddMemberToGroupUC extends ActivityLogItem<UsersWithGroupsData> {
  readonly useCase = ACTIVITY_LOG_USECASES.ADD_MEMBER_TO_GROUP;

  constructor(actor: UserLogDto, communityId: string, props: UsersWithGroupsData) {
    super(actor, communityId, props);
  }
}

export class UpdateGroupProfileUC extends ActivityLogItem<StateChangedOfGroup> {
  readonly useCase = ACTIVITY_LOG_USECASES.UPDATE_GROUP_PROFILE;

  constructor(actor: UserLogDto, communityId: string, props: StateChangedOfGroup) {
    super(actor, communityId, props);
  }
}

export class JoinCommunityAsMemberUC extends ActivityLogItem<CommunityObject> {
  readonly useCase = ACTIVITY_LOG_USECASES.JOIN_COMMUNITY_AS_MEMBER;

  constructor(actor: UserLogDto, communityId: string, props: CommunityObject) {
    super(actor, communityId, props);
  }
}

export class JoinGroupAsMemberUC extends ActivityLogItem<GroupsObject> {
  readonly useCase = ACTIVITY_LOG_USECASES.JOIN_COMMUNITY_AS_MEMBER;

  constructor(actor: UserLogDto, communityId: string, props: GroupsObject) {
    super(actor, communityId, props);
  }
}

export class JoinGroupAsAdminUC extends ActivityLogItem<JoinGroupAsAdminData> {
  readonly useCase = ACTIVITY_LOG_USECASES.JOIN_COMMUNITY_AS_MEMBER;

  constructor(actor: UserLogDto, communityId: string, props: JoinGroupAsAdminData) {
    super(actor, communityId, props);
  }
}

export class LeaveGroupUC extends ActivityLogItem<GroupsObject> {
  readonly useCase = ACTIVITY_LOG_USECASES.LEAVE_GROUP;

  constructor(actor: UserLogDto, communityId: string, props: GroupsObject) {
    super(actor, communityId, props);
  }
}

export class RemoveMembersUC extends ActivityLogItem<UsersWithGroupsData> {
  readonly useCase = ACTIVITY_LOG_USECASES.REMOVE_MEMBER;

  constructor(actor: UserLogDto, communityId: string, props: UsersWithGroupsData) {
    super(actor, communityId, props);
  }
}

export class ApproveJoinRequestsUC extends ActivityLogItem<ApproveJoinRequestData> {
  readonly useCase = ACTIVITY_LOG_USECASES.APPROVE_JOIN_REQUEST;

  constructor(actor: UserLogDto, communityId: string, props: ApproveJoinRequestData) {
    super(actor, communityId, props);
  }
}

export class DeclineJoinRequestsUC extends ActivityLogItem<UsersWithGroupData> {
  readonly useCase = ACTIVITY_LOG_USECASES.DECLINE_JOIN_REQUEST;

  constructor(actor: UserLogDto, communityId: string, props: UsersWithGroupData) {
    super(actor, communityId, props);
  }
}

export class AssignGroupAdminsUC extends ActivityLogItem<GroupAdminStatusChangedData> {
  readonly useCase = ACTIVITY_LOG_USECASES.ASSIGN_GROUP_ADMIN;

  constructor(actor: UserLogDto, communityId: string, props: GroupAdminStatusChangedData) {
    super(actor, communityId, props);
  }
}

export class RevokeGroupAdminsUC extends ActivityLogItem<GroupAdminStatusChangedData> {
  readonly useCase = ACTIVITY_LOG_USECASES.REVOKE_GROUP_ADMIN;

  constructor(actor: UserLogDto, communityId: string, props: GroupAdminStatusChangedData) {
    super(actor, communityId, props);
  }
}
