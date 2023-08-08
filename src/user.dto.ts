import {
  USER_GENDER,
  USER_INVITATION_PRIVACY,
  USER_RELATIONSHIP_STATUS,
  USER_STAFF_ROLE,
  USER_VISIBILITY_PRIVACY
} from "@beincom/constants";

class CommunityInfo {
  id: string;
  name: string;
}

export class ShowingBadgeDto {
  id: string;
  name: string;
  iconUrl: string;
  community?: CommunityInfo;
  isNew?: boolean;
}

export class ShowingBadgesByUserIdMapDto {
  [key: string]: ShowingBadgeDto[];
}

export class UserDto {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  chatId: string;

  beinStaffRole: USER_STAFF_ROLE;
  countryCode: string;
  country: string;
  city: string;
  address: string;
  backgroundImgUrl: string;
  birthday: Date;
  description: string;
  gender: USER_GENDER;
  language: string[];
  phone: string;
  relationshipStatus: USER_RELATIONSHIP_STATUS;
  isDeactivated: boolean;
  isVerified: boolean;
  showingBadges?: ShowingBadgeDto[];

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface SharedUserDto {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
  email: string;
  isDeactivated: boolean;
  isVerified: boolean;
  blockings: string[];
  groups: string[];
  showingBadges?: ShowingBadgeDto[];
  setting?: UserSettingDto;
}

export class UserSettingDto {
  visibilityPrivacy: USER_VISIBILITY_PRIVACY;
  invitationPrivacy: USER_INVITATION_PRIVACY;
}

export class UserPublicInfoDto {
  fullname: string;
  avatar: string;
}

export class UserBasicInfo extends UserPublicInfoDto {
  id: string;
  username: string;
}
