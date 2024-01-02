export enum INVITATION_TYPE {
  EMAIL = 'EMAIL',
  NOTIFICATION = 'NOTIFICATION',
}

export enum INVITATION_TARGET {
  GROUP = 'GROUP',
  GROUP_SET = 'GROUP_SET',
}

export enum INVITATION_STATUS {
  WAITING = 'WAITING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
}

export class InvitationUserInfo {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  isDeactivated: boolean;

  constructor(data: Required<InvitationUserInfo>) {
    this.id = data.id;
    this.username = data.username;
    this.fullname = data.fullname;
    this.email = data.email;
    this.avatar = data.avatar;
    this.isDeactivated = data.isDeactivated;
  }
}

type InvitationTargetInfo = {
  id: string;
  name: string;
  communityName: string;
  isRootGroup: boolean;
};

export class InvitationResponseDTO {
  id: string;
  type: INVITATION_TYPE;
  status: INVITATION_STATUS;
  createdAt: string;
  updatedAt: string;
  targetType: INVITATION_TARGET;
  inviter: InvitationUserInfo;
  invitee: InvitationUserInfo;
  targetInfo: InvitationTargetInfo;
  communityId: string;
}
