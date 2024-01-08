import { INVITATION_TARGET } from '../../invitation.dto';
import { BADGE_TYPE, SCHEME_SCOPE } from '../enums';

export type RequiredProps<T> = T & { [key: string]: any };

export enum ActivityLogUserStateEnum {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  DELETED = 'DELETED',
}

export class ActivityLogUserDTO {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
  isDeactivated: boolean;
  state?: ActivityLogUserStateEnum;

  constructor(object: RequiredProps<ActivityLogUserDTO>) {
    Object.assign(this, {
      id: object.id,
      username: object.username,
      fullname: object.fullname,
      avatar: object.avatar,
      isDeactivated: object.isDeactivated,
      state: object.state,
    });
  }
}

export class ActivityLogCommunityDTO {
  id: string;
  groupId: string;
  name: string;
  privacy: string;

  constructor(object: RequiredProps<ActivityLogCommunityDTO>) {
    Object.assign(this, {
      id: object.id,
      groupId: object.groupId,
      name: object.name,
      privacy: object.privacy,
    });
  }
}

export class ActivityLogGroupDTO {
  id: string;
  communityId: string;
  name: string;
  level: number;
  privacy: string;

  constructor(object: RequiredProps<ActivityLogGroupDTO>) {
    Object.assign(this, {
      id: object.id,
      communityId: object.communityId,
      name: object.name,
      level: object.level,
      privacy: object.privacy,
    });
  }
}

export class ActivityLogGroupSetDTO {
  id: string;
  communityId: string;
  name: string;
  description: string;
  isDefault: boolean;
  groups: ActivityLogGroupDTO[];

  constructor(object: RequiredProps<ActivityLogGroupSetDTO>) {
    Object.assign(this, {
      id: object.id,
      communityId: object.communityId,
      name: object.name,
      isDefault: object.isDefault,
      groups: object.groups,
    });
  }
}

export class ActivityLogBadgeDTO {
  id: string;
  name: string;
  type: BADGE_TYPE;
  iconUrl: string;
  communityId: string;

  constructor(object: RequiredProps<ActivityLogBadgeDTO>) {
    Object.assign(this, {
      id: object.id,
      name: object.name,
      type: object.type,
      iconUrl: object.iconUrl,
      assignedTo: object.assignedTo ? new ActivityLogGroupDTO(object.assignedTo) : null,
      communityId: object.communityId,
    });
  }
}

export class ActivityLogSchemeDTO {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  scope: SCHEME_SCOPE;
  usedInsideCommId: string;

  constructor(object: RequiredProps<ActivityLogSchemeDTO>) {
    Object.assign(this, {
      id: object.id,
      name: object.name,
      description: object.description,
      isSystem: object.isSystem,
      scope: object.scope,
      usedInsideCommId: object.usedInsideCommId,
    });
  }
}

export class InvitationLogDTO {
  id: string;
  communityId: string;
  inviterId: string;
  inviteeId: string;
  targetType: INVITATION_TARGET;
  targetId: string;

  constructor(data: RequiredProps<InvitationLogDTO>) {
    Object.assign(this, {
      id: data.id,
      communityId: data.communityId,
      inviterId: data.inviterId,
      inviteeId: data.inviteeId,
      targetType: data.targetType,
      targetId: data.targetId,
    });
  }
}

export interface ChangeBaseDTO<T> {
  old: T;
  new: T;
}

export type ActivityPropChangedDTO<T = unknown> = {
  [k in keyof T]?: ChangeBaseDTO<T[k]>;
};
