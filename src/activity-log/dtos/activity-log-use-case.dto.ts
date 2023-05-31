export class ActivityLogUserDTO {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
  isDeactivated: boolean;
}

export class ActivityLogCommunityDTO {
  id: string;
  groupId: string;
  name: string;
  privacy: string;
}

export class ActivityLogGroupDTO {
  id: string;
  communityId: string;
  name: string;
  level: number;
  privacy: string;
}

export interface ChangeBaseDTO<T> {
  old: T;
  new: T;
}

export class ActivityPropChangedDTO<T = unknown> {
  [propName: string]: ChangeBaseDTO<T>;
}
