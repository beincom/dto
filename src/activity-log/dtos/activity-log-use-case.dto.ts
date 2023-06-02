import { BADGE_TYPE, SCHEME_SCOPE } from '../enums';

export type RequiredProps<T> = T & { [key: string]: any };

export class ActivityLogUserDTO {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
  isDeactivated: boolean;

  constructor(object: RequiredProps<ActivityLogUserDTO>) {
    Object.assign(this, {
      id: object.id,
      username: object.username,
      fullname: object.fullname,
      avatar: object.avatar,
      isDeactivated: object.isDeactivated,
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
      privacy: object.privacy,
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

export interface ChangeBaseDTO<T> {
  old: T;
  new: T;
}

export class ActivityPropChangedDTO<T = unknown> {
  [propName: string]: ChangeBaseDTO<T>;
}
