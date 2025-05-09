import {
  INTEREST,
  LANGUAGE,
  USER_DIRECT_MESSAGE_PRIVACY,
  USER_GENDER,
  USER_INVITATION_PRIVACY,
  USER_RELATIONSHIP_STATUS,
  USER_STAFF_ROLE,
} from '@beincom/constants';

import { BindedUserSubscriptionDto } from './subscription.dto';

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

export class LatestWorkExperienceDto {
  company: string;
  titlePosition: string;
}

export class UserDto {
  id: string;
  primaryId?: string;
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
  isPhoneVerified: boolean;
  isProfsCreator: boolean;
  referralCode: string;
  interests: INTEREST[];
  latestWork?: LatestWorkExperienceDto;
  showingBadges?: ShowingBadgeDto[];
  shouldCreatePwd?: boolean;
  subscriptions?: BindedUserSubscriptionDto[];
  isPrimary?: boolean;
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
  userId: string;
  invitationPrivacy: USER_INVITATION_PRIVACY;
  directMessagePrivacy: USER_DIRECT_MESSAGE_PRIVACY;
  language: LANGUAGE;
  showOwnedCommunities: boolean;
  showJoinedCommunities: boolean;
  showContent: boolean;
  showPersonalInfo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserPublicInfoDto {
  fullname: string;
  avatar: string;
}

export class UserBasicInfo extends UserPublicInfoDto {
  id: string;
  username: string;
}
